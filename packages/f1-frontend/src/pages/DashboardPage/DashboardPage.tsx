import React from "react";
import {useDispatch, useSelector} from "react-redux";
import "./DashboardPage.scss";
import {Dropdown, DropDownOption} from "../../components/Dropdown";
import {TopNav} from "../../components/TopNav";
import {Footer} from "../../components/Footer";
import {f1Actions, F1RaceExt, F1RaceFilters, F1State} from "../../slices/f1Slice";
import {F1Service} from "../../services/F1Service";

const DashboardPage = () => {
    const dispatch = useDispatch();

    const races = useSelector((state:F1State) => state.races);
    const currentFilters = useSelector((state:F1State) => state.filters);

    const getRaceYearOptions = ():DropDownOption[] => {
        const yearsOptions:DropDownOption[] = [];

        for (let i=2024; i>2014; i--) {
            yearsOptions.push({
                label: `${i}`,
                value: i
            })
        }

        return yearsOptions;
    }

    const getRacesOptions = ():DropDownOption[] => {
        if (!races || !currentFilters.year) return [];

        // TODO: make it a computed on the slice
        const currentYearRaces = Object.values(races[currentFilters.year]);

        if (!currentYearRaces) return [];

        return currentYearRaces.map((race:F1RaceExt) => ({
            label: race.name,
            value: race.id
        }));
    }

    const updateYearFilter = (year:number) => {
        // update filters
        dispatch(f1Actions.setFilters({year} as F1RaceFilters));

        // if no races found for selected year, fetch
        if (!races || !races[year]) {
            F1Service.getRaces(year)
                .then(result => dispatch(f1Actions.setRaces({year, races: result.races})));
        }
    }

    const updateRaceFilter = (raceId:number) => {
        // update filters
        dispatch(f1Actions.setFilters({raceId} as F1RaceFilters));

        // TODO: if no competitions found for selected race, fetch
        // if (!races || !races[year]) {
        //     F1Service.getRaces(year)
        //         .then(result => dispatch(f1Actions.setRaces({year, races: result.races})));
        // }
    }

    return (
        <>
            <div className="page-container">
                <TopNav />
                <main>
                    <h1>Dashboard</h1>
                    <div className="filters-container">
                        <Dropdown
                            label="Race Year"
                            options={getRaceYearOptions()}
                            onChange={updateYearFilter}
                        />

                        <Dropdown
                            label="Race"
                            options={getRacesOptions()}
                            onChange={updateFilters}
                        />
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}

export default DashboardPage;