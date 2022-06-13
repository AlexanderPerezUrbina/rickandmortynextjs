interface Props {
    degree?: number;
}

const ArrowIcon = ({ degree = 0 }: Props) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 24 24"><path fill="currentColor" d="m13 5.586l-4.707 4.707a.999.999 0 1 0 1.414 1.414L12 9.414V17a1 1 0 1 0 2 0V9.414l2.293 2.293a.997.997 0 0 0 1.414 0a.999.999 0 0 0 0-1.414L13 5.586z"/></svg>
            <style jsx>{`
                svg {
                    transform: rotate(${degree}deg);
                    width: 32px;
                    height: 32px;
                }
            `}</style>
        </>
    );
};

export default ArrowIcon;
