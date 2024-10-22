import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { F1Race, F1Competition } from "f1-interfaces/interfaces";

export interface F1RacesMap { [key:number]: F1Race }
export interface F1CompetitionMap { [key:number]: F1Competition }

export interface F1RaceExt extends F1Race {
    competitions: F1CompetitionMap,
}

export interface F1RaceFilters {
    year: number;
    competitionId: number|undefined;
}

export interface F1State {
    filters:F1RaceFilters,
    races: F1RaceExt[],
}

const filtersInitialState:F1RaceFilters = {
    year: new Date().getFullYear(),
    competitionId: undefined,
}

const initialState:F1State = {
    filters: {...filtersInitialState},
    races: [],
}

// Create the slice
const f1Slice = createSlice({
    name: 'f1',
    initialState,
    reducers: {
        setFilters(state:F1State, action: PayloadAction<F1RaceFilters>) {
            Object.assign(state.filters, action.payload);
        },

        // TODO: fix objects storing need to think about mapping to make access faster and easier...
        // setRaces(state:F1State, action: PayloadAction<F1RaceExt[]>) {
        //     state.races = action.payload
        //         .reduce((races:F1RacesMap, race:F1RaceExt):F1RacesMap => {
        //             races[state.filters.year] = competition;
        //             return competitions;
        //         }, {});
        // },
        //
        // setRaceCompetition(state:F1State, action: PayloadAction<F1Competition[]>) {
        //     state.races[state.filters.year].competitions = action.payload
        //         .reduce((competitions:F1CompetitionMap, competition:F1Competition):F1CompetitionMap => {
        //         competitions[competition.id] = competition;
        //         return competitions;
        //     }, {});
        // },
    },
});

export default f1Slice.reducer;

// Selector to access the state
export const getF1State = (state: RootState) => state.f1;
