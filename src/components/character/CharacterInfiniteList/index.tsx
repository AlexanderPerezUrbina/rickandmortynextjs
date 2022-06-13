import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
    Character,
    CharacterResponse,
} from "../../../interfaces/RickAndMortyAPI";
import { CharacterCard } from "../../character";
import { Loader } from '../../ui';

interface Props {
    charactersURL: string;
}

const CharacterInfiniteList = ({ charactersURL }: Props) => {
    const [nextPageURL, setNextPageURL] = useState<string | null>(null);
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get<CharacterResponse>(charactersURL);
            setCharacters(response.data.results);
            setNextPageURL(response.data.info.next);
        })();
    }, [charactersURL]);

    const fetchNextPage = async () => {
        if (!nextPageURL) {
            return;
        }

        const response = await axios.get<CharacterResponse>(nextPageURL);
        setCharacters([...characters, ...response.data.results]);
        setNextPageURL(response.data.info.next);
    };

    return (
        <>
            {characters.length > 0 ? (
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
            ) : (
                <Loader
                    properties={{
                        size: "40px",
                        weight: "5px",
                    }}
                    style={{
                        margin: "20px auto",
                    }}
                />
            )}
        </>
    );
};

export default CharacterInfiniteList;
