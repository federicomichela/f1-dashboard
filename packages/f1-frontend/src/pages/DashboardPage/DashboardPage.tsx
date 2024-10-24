import React, {useEffect, useState} from 'react';
import {F1Race} from "f1-interfaces";
import "./DashboardPage.scss";
import {F1Service} from "../../services/F1Service";
import {Dropdown, DropDownOption} from "../../components/Dropdown";
import {TopNav} from "../../components/TopNav";
import {Footer} from "../../components/Footer";

const DashboardPage = () => {
    const [selectedYear, setSelectedYear] = useState(0); // State for selected year
    const [racesDDOptions, setRacesDDOptions] = useState([] as DropDownOption[]); // State for values from API
    const [selectedYearRaces, setSelectedYearRaces] = useState([] as F1Race[]); // State for values from API
    const [selectedRaceId, setSelectedRaceId] = useState(0); // State for selected custom value
    const [racesDDLabel, setRacesDDLabel] = useState('Races'); // State for selected custom value

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
    const fetchCustomValues = async (year: number) => {
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
            console.error('Error fetching custom values:', error);
            setRacesDDOptions([]); // Reset if there's an error
        }
    };

    // Effect to trigger fetch when selectedYear changes
    useEffect(() => {
        if (selectedYear) {
            fetchCustomValues(selectedYear);
        }
    }, [selectedYear]);

    // Handle year selection
    const handleYearChange = (year: number) => {
        setSelectedYear(year); // Set selected year
        setSelectedRaceId(0); // Reset custom value when year changes
        setSelectedYearRaces([]); // Reset custom value when year changes
        setRacesDDLabel('Loading...'); // Reset custom value when year changes
    };

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
                        onChange={setSelectedRaceId}
                        disabled={!selectedYearRaces.length}
                    />
                </div>

                {/* TODO: Remove below debugging code */}
                <div>
                    <h2>Selected Filters:</h2>
                    <p>Year: {selectedYear || 'None'}</p>
                    <p>Custom Value: {selectedRaceId || 'None'}</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DashboardPage;
