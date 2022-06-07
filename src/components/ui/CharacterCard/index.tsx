import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import {
    Status,
    Gender,
    Character,
    Species,
} from "../../../interfaces/RickAndMortyAPI";
import {
    getGender,
    getSpecies,
    getStatus,
} from "../../../helpers/getCharacterData";

interface Props extends HTMLAttributes<HTMLDivElement> {
    character: Character;
}

const Card: FC<Props> = ({
    character: { status, image, name, gender, species, id },
    ...otherProps
}) => {

    return (
        <>
            <div className="card" {...otherProps}>
                <header className="image-header">
                    <Link href={`/character/${id}`} passHref>
                        <a>
                            <Image
                                width={300}
                                height={300}
                                src={image}
                                alt={name}
                                className="image-main"
                            />
                        </a>
                    </Link>
                </header>
                <div className="text-header">
                    <Link href={`/character/${id}`} passHref>
                        <a>
                            <h3 className="title-card">{name}</h3>
                        </a>
                    </Link>
                </div>

                <p className="text-card">
                    <em>{getGender(gender)}</em>/{getSpecies(species)}
                </p>

                <div className="status">
                    <div></div>
                    <span>{getStatus(status).message}</span>
                </div>
            </div>
            <style jsx>{`
                .card {
                    width: 300px;
                    padding: 20px;
                    border-radius: 20px;
                    border: 1px solid #ccc;
                    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); */
                    position: relative;
                }

                .image-header {
                    cursor: pointer;
                }

                .text-header {
                    display: flex;
                    position: relative;
                }

                .status {
                    position: absolute;
                    bottom: 10px;
                    right: 20px;
                }

                .title-card {
                    font-size: 1.3rem;
                    color: #000;
                    font-weight: 600;
                    cursor: pointer;
                    margin: 20px 0 0 0;
                }

                .title-card:hover {
                    color: #00a8ff;
                }

                .text-card {
                    font-weight: 300;
                    margin: 0 0 20px 0;
                }

                .status {
                    display: flex;
                    align-items: center;
                }

                .status > div {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: ${getStatus(status).color};
                    margin-right: 5px;
                }

                .status span {
                    font-size: 14px;
                }
            `}</style>
        </>
    );
};

export default Card;
