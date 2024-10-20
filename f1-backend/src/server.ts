import express from 'express';
import axios from 'axios';

const app = express();
const port = 10000;

// Route to retrieve the race winner
app.get('/api/schedules', async (req:any, res:any) => {
    let { year } = req.query;

    year = year || new Date().getFullYear();

    const options = {
        method: 'GET',
        url: `https://f1-motorsport-data.p.rapidapi.com/schedule?year=${year}`,
        headers: {
            'x-rapidapi-host': 'f1-motorsport-data.p.rapidapi.com',
            'x-rapidapi-key': '7455d68b55msh4ba37d94f2246d6p1e6b7cjsned4538fcbb3e',
        },
    };

    try {
        const response = await axios.request(options);
        const schedules = response.data;

        if (schedules) {
            res.json({ schedules });
        } else {
            res.status(404).json({ message: `Schedule not found for year ${year}` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching race data' });
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
