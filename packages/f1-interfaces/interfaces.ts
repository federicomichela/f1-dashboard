export interface Link {
    url: string;
    alt?: string;
}

export interface F1RaceStatus {
    completed: boolean,
    type: string,
    label: string,
    detail: string,
}

export interface F1Driver {
    id: number,
    fullName: string,
    abbreviation: string,
    team: string,
    teamColor: string,
    headshot?: Link,
    winner?: boolean,
}

export interface F1Race {
    id: number,
    startDate: Date,
    endDate: Date,
    shortName: string,
    name: string,
    status: F1RaceStatus,
}

export interface F1Competition {
    id: number,
    name: string,
    date: Date,
    participants: F1Driver[],
}