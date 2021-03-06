import type { NextPage } from "next";
import Head from "next/head";

import { CharacterInfiniteList } from "../components/character";
import { BtnScrollToTop } from "../components/ui";

import { useTheme as useNextTheme } from "next-themes";
import { useTheme } from "@nextui-org/react";

const Home: NextPage = () => {

    const { setTheme } = useNextTheme();
    const { isDark } = useTheme();

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

                <BtnScrollToTop />

                <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>Change to {isDark ? 'light': 'dark'}</button>

                <div>
                    <h2>Personajes</h2>
                    <CharacterInfiniteList charactersURL="https://rickandmortyapi.com/api/character?page=1" />
                </div>
            </main>
        </div>
    );
};

export default Home;
