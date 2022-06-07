export interface CharacterResponse {
    info:    Info;
    results: Character[];
}

export interface Info {
    count: number;
    pages: number;
    next:  string | null;
    prev:  string | null;
}

export interface Character {
    id:       number;
    name:     string;
    status:   Status;
    species:  Species;
    type:     string;
    gender:   Gender;
    origin:   CharacterLocation;
    location: CharacterLocation;
    image:    string;
    episode:  string[];
    url:      string;
    created:  string;
}

export enum Gender {
    Female = "Female",
    Male = "Male",
    Unknown = "unknown",
    Genderless = "Genderless"
}

export interface CharacterLocation {
    name: string;
    url:  string;
}

export enum Species {
    Alien = "Alien",
    Human = "Human",
    Humanoid = "Humanoid",
    Unknown = "unknown",
    Poopybutthole = "Poopybutthole",
    'Mythological Creature' = "Mythological Creature",
    Animal = "Animal",
    Robot = "Robot",
    Cronenberg = "Cronenberg",
    Disease = "Disease",
}

export enum Status {
    Alive = "Alive",
    Dead = "Dead",
    Unknown = "unknown",
}

export interface LocationResponse {
    info:    Info;
    results: Location[];
}

export interface Location {
    id:        number;
    name:      string;
    type:      string;
    dimension: string;
    residents: string[];
    url:       string;
    created:   string;
}

export interface EpisodeResponse {
    info:    Info;
    results: Episode[];
}

export interface Episode {
    id:         number;
    name:       string;
    air_date:   string;
    episode:    string;
    characters: string[];
    url:        string;
    created:    string;
}
