import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import {
    getGender,
    getSpecies,
    getStatus,
} from "../../helpers/getCharacterData";
import {
    Character,
    CharacterResponse,
    Episode,
    Location,
} from "../../interfaces/RickAndMortyAPI";

import { Modify } from "../../interfaces/Utilities";

interface Props {
    character: CharacterWithAllData;
}

interface CharacterWithAllData
    extends Modify<
        Character,
        {
            episodes: Episode[] | null;
            location: Location | null;
            origin: Location | null;
            status: {
                message: string;
                color: string;
            };
        }
    > {}

const Character: NextPage<Props> = ({
    character: {
        name,
        status,
        gender,
        species,
        image,
        episodes,
        location,
        origin,
    },
}) => {
    return (
        <>
            <Head>
                <title>{name} | RickAndMortyAPI</title>
            </Head>
            <h1>{name}</h1>
            <Image width={300} height={300} src={image} alt={name} />
            <h2 style={{ backgroundColor: status.color }}>{status.message}</h2>
            <h2>{gender}</h2>
            <h2>{species}</h2>
            <h3>Location</h3>
            <p>{location && location.name}</p>

            <h3>Episodes</h3>
            {episodes && episodes.map((episode) => (
                <p key={episode.id}>{episode.name}</p>
            ))}

            <h3>Origin</h3>
            {/* <p>{origin && origin.residents[0]}</p> */}
            <p>{origin && origin.url}</p>
        </>
    );
};

export const getStaticPaths = async () => {
    const response = await axios.get<CharacterResponse>(
        "https://rickandmortyapi.com/api/character?page=1"
    );

    return {
        paths: response.data.results.map((character) => ({
            params: {
                id: character.id.toString(),
            },
        })),
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const response = await axios.get<Character>(
            `https://rickandmortyapi.com/api/character/${params?.id}`
        );

        const getEpisodes = async (): Promise<Episode[] | null> => {
            try {
                return Promise.all(
                    response.data.episode.map(async (episode) => {
                        const episodeResponse = await axios.get<Episode>(
                            episode
                        );
                        return episodeResponse.data;
                    })
                );
            } catch (error) {
                return null;
            }
        };

        const getLocation = async (): Promise<Location | null> => {
            try {
                const locationResponse = await axios.get<Location>(
                    response.data.location.url
                );
                return locationResponse.data;
            } catch (error) {
                return null;
            }
        };

        const getOrigin = async (): Promise<Location | null> => {
            try {
                const originResponse = await axios.get<Location>(
                    response.data.origin.url
                );
                return originResponse.data;
            } catch (error) {
                return null;
            }
        };

        const episodes = await getEpisodes();
        const location = await getLocation();
        const origin = await getOrigin();

        return {
            props: {
                character: {
                    ...response.data,
                    status: getStatus(response.data.status),
                    gender: getGender(response.data.gender),
                    species: getSpecies(response.data.species),
                    episodes,
                    location,
                    origin,
                },
            },
        };
    } catch (error) {}

    return {
        notFound: true,
    };
};

export default Character;
