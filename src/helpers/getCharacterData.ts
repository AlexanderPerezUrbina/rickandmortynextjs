import { Gender, Species, Status } from "../interfaces/RickAndMortyAPI";

export const getStatus = (status: Status) => {
    const statusMap = {
        [Status.Alive]: {
            message: "Vivo",
            color: "#4CAF50",
        },
        [Status.Dead]: {
            message: "Muerto",
            color: "#F44336",
        },
        [Status.Unknown]: {
            message: "Desconocido",
            color: "#9E9E9E",
        },
    };
    return statusMap[status] || statusMap[Status.Unknown];
};

export const getGender = (gender: Gender) => {
    const genderMap = {
        [Gender.Male]: "Hombre",
        [Gender.Female]: "Mujer",
        [Gender.Genderless]: "Sin Género",
        [Gender.Unknown]: "Desconocido",
    };
    return genderMap[gender] || genderMap[Gender.Genderless];
};

export const getSpecies = (species: Species) => {
    const speciesMap = {
        [Species.Human]: "Humano",
        [Species["Mythological Creature"]]: "Criatura Mitologica",
        [Species.Alien]: "Alienigena",
        [Species.Humanoid]: "Humanoide",
        [Species.Animal]: "Animal",
        [Species.Robot]: "Robot",
        [Species.Cronenberg]: "Cronenberg",
        [Species.Disease]: "Enfermedad",
        [Species.Poopybutthole]: "Poopybutthole",
        [Species.Unknown]: "Desconocido",
    };
    return speciesMap[species] || speciesMap[Species.Unknown];
};
