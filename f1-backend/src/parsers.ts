import {F1Driver, F1Race, F1Competition, F1RaceStatus} from "./interfaces";

export function parseRaceStatus(status: any):F1RaceStatus {
    return {
        completed: status.type.completed,
        type: status.type.name,
        label: status.type.description,
        detail: status.type.shortDetail,
    }
}

export function parseRace(race: any):F1Race {
    return {
        id: race.id,
        startDate: race.startDate,
        endDate: race.endDate,
        shortName: race.shortName,
        name: race.name,
        status: parseRaceStatus(race.status),
    };
}

export function parseDriver(driver: any):F1Driver {
    return {
        id: driver.athleteInfo.id,
        winner: driver.winner,
        fullName: driver.athleteInfo.displayName,
        abbreviation: driver.athleteInfo.abbreviation,
        team: driver.athleteInfo.team,
        teamColor: driver.athleteInfo.teamColor,
        headshot: driver.athleteInfo.headshot ? {
            url: driver.athleteInfo.headshot.href,
            alt: driver.athleteInfo.headshot.alt,
        } : undefined
,
    }
}

export function parseCompetition(competition: any):F1Competition {
    return {
        id: competition.competitionId,
        name: competition.titleTab,
        date: competition.date,
        participants: competition.positions.map(parseDriver),
    }
}