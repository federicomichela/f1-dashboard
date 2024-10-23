import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dropdown, DropDownOption} from "../../components/Dropdown";
import {TopNav} from "../../components/TopNav";
import {Footer} from "../../components/Footer";
import {f1Actions, F1RaceFilters, F1State} from "../../slices/f1Slice";
import {F1Service} from "../../services/F1Service";

const DashboardPage = () => {
    const dispatch = useDispatch();

    const races = useSelector((state:F1State) => state.races);

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

    const updateFilters = (year:number) => {
        console.log('Update filters.year to ', year)

        // update filters
        dispatch(f1Actions.setFilters({year} as F1RaceFilters));

        // if no races found for selected year, fetch
        if (!races || !races[year]) {
            F1Service.getRaces(year)
                .then(result => dispatch(f1Actions.setRaces({year, races: result.races})));
        }
    }

    return (
        <>
            <div className="page-container">
                <TopNav />
                <main className="">
                    <h1>Dashboard</h1>
                    <Dropdown
                        label="Race Year"
                        options={getRaceYearOptions()}
                        onChange={updateFilters}
                    />
                </main>

                <Footer />
            </div>
        </>
    );
}

export default DashboardPage;