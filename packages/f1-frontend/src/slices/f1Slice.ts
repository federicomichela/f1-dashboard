import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { F1Race, F1Competition } from "f1-interfaces/interfaces";

export interface F1RacesMap { [key:number]: F1RaceMap }                     // {raceYear: {raceId: raceMap}}
export interface F1RaceMap { [key:number]: F1RaceExt }                      // {raceId: raceObj}
export interface F1CompetitionMap { [key:number]: F1Competition }           // {competitionId: competitionObj}

export interface F1RaceExt extends F1Race {
    competitions: F1CompetitionMap|undefined,
}

export interface F1RaceFilters {
    year: number|undefined;
    raceId: number|undefined;
    competitionId: number|undefined;
}

export interface F1State {
    filters:F1RaceFilters,
    races: F1RacesMap|undefined,
}

const filtersInitialState:F1RaceFilters = {
    year: undefined,
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

        setRaces(state:F1State, action: PayloadAction<F1Race[]>) {
            const races = action.payload;

            if (!state.filters.year) return;

            if (!state.races) {
                state.races = {};
            }

            state.races[state.filters.year] = races
                .reduce((races:F1RaceMap, race:F1Race):F1RaceMap => {
                    races[race.id] = {...race, ...{competitions: {}}};
                    return races;
                }, {});
        },

        setRaceCompetition(state:F1State, action: PayloadAction<F1Competition[]>) {
            if (!state.races || !state.filters.year || !state.filters.raceId) return;

            state.races[state.filters.year][state.filters.raceId].competitions = action.payload
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

export const getCurrentYearRaces = (state: RootState): F1RaceExt[] => {
    const {races, filters} = state.f1;

    if (!races || !filters.year) return [];

    return Object.values(races[filters.year]);
}

export const getSelectedRace = (state: RootState):F1RaceExt|undefined => {
    const {filters} = state.f1;
    const races = getCurrentYearRaces(state);

    if (!filters.raceId) return;

    return races[filters.raceId] || undefined;
}

export const getCompetitionWinner = (state: RootState) => {
    const { filters, races } = state.f1;

    // Check if races, raceId, competitionId, and competitions exist
    if (!races || !filters.year || !filters.raceId || !filters.competitionId) return;

    const race = races[filters.year][filters.raceId];
    if (!race || !race.competitions) return;

    const competition = race.competitions[filters.competitionId];
    if (!competition || !competition.participants) return;

    // Find and return the winner from the participants
    return competition.participants.find(driver => driver.winner);
};