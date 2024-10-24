import React, {useEffect, useState} from 'react';
import {F1Competition, F1Race} from "f1-interfaces";
import "./DashboardPage.scss";
import {F1Service} from "../../services/F1Service";
import {Dropdown, DropDownOption} from "../../components/Dropdown";
import {TopNav} from "../../components/TopNav";
import {Footer} from "../../components/Footer";

const DashboardPage = () => {
    const [selectedYear, setSelectedYear] = useState(0);
    const [racesDDLabel, setRacesDDLabel] = useState('Races');
    const [racesDDOptions, setRacesDDOptions] = useState([] as DropDownOption[]); 
    const [competitionsDDLabel, setCompetitionsDDLabel] = useState('Competitions');
    const [competitionsDDOptions, setCompetitionsDDOptions] = useState([] as DropDownOption[]); 
    const [selectedYearRaces, setSelectedYearRaces] = useState([] as F1Race[]);
    const [selectedRaceId, setSelectedRaceId] = useState(0); 
    const [selectedRaceCompetitions, setSelectedRaceCompetitions] = useState([] as F1Competition[]);
    const [selectedRaceCompetitionId, setSelectedRaceCompetitionId] = useState(0);

    const getYearOptions = ():DropDownOption[] => {
        const yearsOptions:DropDownOption[] = [];

        for (let i=2024; i>2014; i--) {
            yearsOptions.push({
                label: `${i}`,
                value: i
            })
        }

        return yearsOptions;
    }

    // Fetch custom values based on the selected year
    const fetchRaces = async (year: number) => {
        try {
            const {races} = await F1Service.getRaces(year);
            const ddOptions = races.reduce((acc: DropDownOption[], item: F1Race): DropDownOption[] => {
                acc.push({
                    label: item.name,
                    value: item.id,
                })

                return acc;
            }, []);
            setRacesDDOptions(ddOptions);
            setRacesDDLabel('Races');
            setSelectedYearRaces(races);
        } catch (error) {
            console.error('Error fetching races:', error);
            setRacesDDOptions([]); // Reset if there's an error
        }
    };

    // Fetch custom values based on the selected year
    const fetchCompetitions = async (raceId: number) => {
        try {
            const {competitions} = await F1Service.getCompetitions(raceId);
            const ddOptions = competitions.reduce((acc: DropDownOption[], item: F1Competition): DropDownOption[] => {
                acc.push({
                    label: item.name,
                    value: item.id,
                })

                return acc;
            }, []);
            setCompetitionsDDOptions(ddOptions);
            setCompetitionsDDLabel('Competitions');
            setSelectedRaceCompetitions(competitions);
        } catch (error) {
            console.error('Error fetching competitions:', error);
            setCompetitionsDDOptions([]); // Reset if there's an error
        }
    };

    // Effect to trigger fetch when selectedYear changes
    useEffect(() => {
        if (selectedYear) {
            fetchRaces(selectedYear);
        }
    }, [selectedYear]);

    // Effect to trigger fetch when selectedRaceId changes
    useEffect(() => {
        if (selectedRaceId) {
            fetchCompetitions(selectedRaceId);
        }
    }, [selectedRaceId]);

    // Handle year selection
    const handleYearChange = (year: number) => {
        setSelectedYear(year)

        // reset values
        setSelectedRaceId(0);
        setSelectedYearRaces([]);
        setRacesDDLabel('Loading...');
    };

    const handleRaceChange = (raceId: number) => {
        setSelectedRaceId(raceId);

        // reset values
        setSelectedRaceCompetitionId(0);
        setSelectedRaceCompetitions([]);
        setCompetitionsDDLabel('Loading...');
    }

    return (
        <div className="page-container">
            <TopNav/>
            <main>
                <h1>Dashboard</h1>
                <div className="filters-container">
                    <Dropdown
                        label="Year"
                        options={getYearOptions()}
                        onChange={handleYearChange}
                    />

                    <Dropdown
                        label={racesDDLabel}
                        options={racesDDOptions}
                        onChange={handleRaceChange}
                        disabled={!selectedYearRaces.length}
                    />

                    <Dropdown
                        label={competitionsDDLabel}
                        options={competitionsDDOptions}
                        onChange={setSelectedRaceCompetitionId}
                        disabled={!selectedRaceCompetitions.length}
                    />
                </div>

                {/* TODO: Remove below debugging code */}
                <div>
                    <h2>Selected Filters:</h2>
                    <p>Year: {selectedYear || 'None'}</p>
                    <p>RaceID: {selectedRaceId || 'None'}</p>
                    <p>CompetitionID: {selectedRaceCompetitionId || 'None'}</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DashboardPage;
