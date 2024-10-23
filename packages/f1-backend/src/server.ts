import express from 'express';
const cors = require('cors');
import axios from 'axios';
import {parseCompetition, parseRace} from "./parsers";

const app = express();
const port = 10000;

const corsOptions = {
    origin: 'http://localhost:3000', // TODO: Replace ENV variable
    methods: 'GET', // Specify allowed HTTP methods
};

app.use(cors(corsOptions));

// Route to retrieve the races
app.get('/api/races/:year', async (req:any, res:any) => {
    let { year } = req.params;

    const options = {
        method: 'GET',
        url: `https://f1-motorsport-data.p.rapidapi.com/scoreboard?year=${year}`,
        headers: {
            'x-rapidapi-host': 'f1-motorsport-data.p.rapidapi.com',
            'x-rapidapi-key': '7455d68b55msh4ba37d94f2246d6p1e6b7cjsned4538fcbb3e',
        },
    };

    try {
        const response = await axios.request(options);
        const scoreboard = response.data.scoreboard;

        if (scoreboard) {
            const parsedRaces = scoreboard.map(parseRace);

            res.json({ races: parsedRaces });
        } else {
            res.status(404).json({ message: `Schedule not found for year ${year}` });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error fetching race data' });
    }
});

// Route to retrieve the race winner
app.get('/api/races/:raceId/competitions', async (req:any, res:any) => {
    const {raceId} = req.params;

    const options = {
        method: 'GET',
        url: `https://f1-motorsport-data.p.rapidapi.com/race-report?eventId=${raceId}`,
        headers: {
            'x-rapidapi-host': 'f1-motorsport-data.p.rapidapi.com',
            'x-rapidapi-key': '7455d68b55msh4ba37d94f2246d6p1e6b7cjsned4538fcbb3e',
        },
    };

    try {
        const response = await axios.request(options);
        const competitions = response.data.report.positions;

        if (competitions) {
            const parsedCompetitions = competitions.map(parseCompetition);

            res.json({ competitions: parsedCompetitions });
        } else {
            res.status(404).json({ message: `Competitions not found for race ${raceId}` });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error fetching race data' });
    }
});



app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
