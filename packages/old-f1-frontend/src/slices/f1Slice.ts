import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { F1Race, F1Competition } from "f1-interfaces/interfaces";

export interface F1RacesMap { [key:number]: F1RaceExt }
export interface F1CompetitionMap { [key:number]: F1Competition }

export interface F1RaceExt extends F1Race {
    competitions: F1CompetitionMap|undefined,
}

export interface F1RaceFilters {
    year: number;
    raceId: number|undefined;
    competitionId: number|undefined;
}

export interface F1State {
    filters:F1RaceFilters,
    races: F1RacesMap|undefined,
}

const filtersInitialState:F1RaceFilters = {
    year: new Date().getFullYear(),
    raceId: undefined,
    competitionId: undefined,
}

const initialState:F1State = {
    filters: {...filtersInitialState},
    races: {},
}

// Create the slice
const f1Slice = createSlice({
    name: 'f1',
    initialState,
    reducers: {
        setFilters(state:F1State, action: PayloadAction<F1RaceFilters>) {
            Object.assign(state.filters, action.payload);
        },

        setRaces(state:F1State, action: PayloadAction<F1RaceExt[]>) {
            state.races = action.payload
                .reduce((races:F1RacesMap, race:F1RaceExt):F1RacesMap => {
                    races[race.id] = race;
                    return races;
                }, {});
        },

        setRaceCompetition(state:F1State, action: PayloadAction<F1Competition[]>) {
            if (!state.races || !state.filters.raceId) return;

            state.races[state.filters.raceId].competitions = action.payload
                .reduce((competitions:F1CompetitionMap, competition:F1Competition):F1CompetitionMap => {
                competitions[competition.id] = competition;
                return competitions;
            }, {});
        },
    },
});

export default f1Slice.reducer;

// Selectors
export const f1Actions = f1Slice.actions;
export const getF1State = (state: RootState) => state.f1;
export const getCompetitionWinner = (state: RootState) => {
    const { filters, races } = state.f1;

    // Check if races, raceId, competitionId, and competitions exist
    if (!races || !filters.raceId || !filters.competitionId) return;

    const race = races[filters.raceId];
    if (!race || !race.competitions) return;

    const competition = race.competitions[filters.competitionId];
    if (!competition || !competition.participants) return;

    // Find and return the winner from the participants
    return competition.participants.find(driver => driver.winner);
};