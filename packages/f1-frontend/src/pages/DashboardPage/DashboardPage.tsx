import React from "react";
import {useDispatch, useSelector} from "react-redux";
import "./DashboardPage.scss";
import {Dropdown, DropDownOption} from "../../components/Dropdown";
import {TopNav} from "../../components/TopNav";
import {Footer} from "../../components/Footer";
import {f1Actions, F1RaceExt, F1RaceFilters, getCurrentYearRaces, getSelectedRace} from "../../slices/f1Slice";
import {F1Service} from "../../services/F1Service";
import {RootState} from "../../store";

const DashboardPage = () => {
    const dispatch = useDispatch();

    const currentFilters = useSelector((state:RootState) => state.f1.filters);
    const currentYearRaces = useSelector(getCurrentYearRaces);
    // const currentYearSelectedRace = useSelector(getSelectedRace);

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
        return currentYearRaces.map((race:F1RaceExt) => ({
            label: race.name,
            value: race.id
        }));
    }

    const updateYearFilter = async (year:number) => {
        // update selected year in filters
        dispatch(f1Actions.setFilters({year} as F1RaceFilters));

        if (year && !currentYearRaces) {
            const response = await F1Service.getRaces(year);

            if (response.races) {
                dispatch(f1Actions.setRaces(response.races));
            }
        }
    }

    const updateRaceFilter = (raceId:number) => {
        // update filters
        dispatch(f1Actions.setFilters({raceId} as F1RaceFilters));

        // if no competitions found for selected race, fetch
        // if (currentYearSelectedRace && !currentYearSelectedRace.competitions) {
        //     F1Service.getCompetitions(raceId)
        //         .then(result => dispatch(f1Actions.setRaceCompetition(result.competitions)));
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
                            onChange={updateRaceFilter}
                            disabled={!currentFilters.year || !currentYearRaces}
                        />
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}

export default DashboardPage;