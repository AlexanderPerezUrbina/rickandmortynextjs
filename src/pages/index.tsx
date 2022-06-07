import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import type {
    Character,
    CharacterResponse,
    Status,
} from "../interfaces/RickAndMortyAPI";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CharacterCard, Loader } from "../components/ui";
import Link from "next/link";

import styles from '../styles/Home.module.css';

interface Props {
    characters: Character[];
    nextPageURL: string;
}

const Home: NextPage<Props> = ({
    characters: initialCharacters,
    nextPageURL: initialNextPageURL,
}) => {
    const [characters, setCharacters] = useState<Character[]>(initialCharacters);
    const [nextPageURL, setNextPageURL] = useState<string | null>(initialNextPageURL);

    const fetchNextPage = async () => {
        if (!nextPageURL) {
            return;
        }

        const response = await axios.get<CharacterResponse>(nextPageURL);
        setCharacters([...characters, ...response.data.results]);
        setNextPageURL(response.data.info.next);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <div>
            <Head>
                <title>Rick and Morty API</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Rick and Morty API</h1>

                <button className={styles.btnScrollToTop} onClick={scrollToTop} >A</button>

                <div>
                    <h2>Personajes</h2>
                    <InfiniteScroll
                        next={fetchNextPage}
                        hasMore={!!nextPageURL}
                        loader={
                            <Loader
                                properties={{
                                    size: "40px",
                                    weight: "5px",
                                }}
                                style={{
                                    margin: "20px auto",
                                }}
                            />
                        }
                        dataLength={characters.length}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                        style={{
                            overflow: "hidden",
                            padding: "20px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",
                            }}
                        >
                            {characters.map((character) => (
                                <CharacterCard
                                    key={character.id}
                                    character={character}
                                    style={{
                                        margin: "10px",
                                    }}
                                />
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </main>
        </div>
    );
};

export const getStaticProps = async () => {
    const response = await axios.get<CharacterResponse>(
        "https://rickandmortyapi.com/api/character?page=1"
    );

    return {
        props: {
            characters: response.data.results,
            nextPageURL: response.data.info.next,
        },
    };
};

export default Home;
