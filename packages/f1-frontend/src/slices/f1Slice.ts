import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';

export interface F1RaceFilters {
    startDate: Date,
    endDate: Date,
    grandPrix: string,
    circuit: string,
    disrupted: boolean,
}

export interface F1Vehicle {
    number: string,
    manufacturer: string,
    chassis: string,
    engine: string,
    tire: string,
    team: string,
}

export interface Flag {
    image: string,
    alt: string,
}

export interface F1Racer {
    id: number,
    fullName: string,
    dateOfBirth: Date,
    headshot: string,
    vehicles: F1Vehicle[],
    active: boolean,
    flag: Flag,
}

export interface F1Race {

}

export interface F1State {
    filters:F1RaceFilters,
    races: F1Race[],
}

const filtersInitialState:F1RaceFilters = {
    startDate: new Date(),
    endDate: new Date(),
    grandPrix: '',
    circuit: '',
    disrupted: false
}

const initialState:F1State = {
    filters: {...filtersInitialState}
}

// Create the slice
const f1Slice = createSlice({
    name: 'f1',
    initialState,
    reducers: {},
});

export default f1Slice.reducer;

// Selector to access the state
export const getF1State = (state: RootState) => state.f1;
