import axios from "axios";
import type { GetStaticProps, NextPage } from 'next';
import type { Character, CharacterResponse } from "../../interfaces/RickAndMortyAPI";

interface Props {
    character: Character;
}

const Character: NextPage<Props> = ({ character }) => {
    return (
        <div>{JSON.stringify(character, null, 4)}</div>
    );
};

export const getStaticPaths = async () => {
    const response = await axios.get<CharacterResponse>('https://rickandmortyapi.com/api/character?page=1');

    return {
        paths: response.data.results.map(character => ({
            params: {
                id: character.id.toString()
            }
        })),
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const response = await axios.get<Character>(`https://rickandmortyapi.com/api/character/${params?.id}`);
        return {
            props: {
                character: response.data
            }
        }
    } catch (error) {}

    return {
        notFound: true
    }
}

export default Character;
