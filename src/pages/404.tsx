import Head from "next/head";
import Link from "next/link";

const FourOhFour = () => {
    return (
        <>
            <Head>
                <title>Pagina no encontrada | RickAndMortyAPI</title>
            </Head>
            <h1>404 - Page Not Found</h1>
            <Link href="/">
                <a>Go back home</a>
            </Link>
        </>
    );
};

export default FourOhFour;
