import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    properties?: LoaderProperties;
}

type LoaderProperties = {
    size?: string | number;
    weight?: string | number;
    speed?: string | number;
    color?: string;
    backgroundColor?: string;
};

const Loader: FC<Props> = ({ properties, ...otherProps }) => {
    const isNumber = (value: any) => {
        return typeof value === "number";
    };

    const {
        size,
        speed,
        weight,
        color,
        backgroundColor,
    }: Required<LoaderProperties> = {
        size: properties?.size
            ? isNumber(properties?.size)
                ? `${properties?.size}px`
                : properties?.size
            : "60px",
        weight: properties?.weight
            ? isNumber(properties?.weight)
                ? `${properties?.weight}px`
                : properties?.weight
            : "5px",
        speed: properties?.speed
            ? isNumber(properties?.speed)
                ? `${properties?.speed}s`
                : properties?.speed
            : "0.8s",
        color: properties?.color ?? "dodgerblue",
        backgroundColor: properties?.backgroundColor ?? "lightgray",
    };

    return (
        <>
            <div {...otherProps}></div>
            <style jsx>{`
                div {
                    width: ${size};
                    height: ${size};
                    border-radius: 50%;
                    border: ${weight} solid ${backgroundColor};
                    border-top: ${weight} solid ${color};
                    animation: spin ${speed} linear infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </>
    );
};

export default Loader;
