"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = 4000;
// Route to retrieve the race winner
app.get('/api/winner', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year, raceName } = req.query;
    const options = {
        method: 'GET',
        url: `https://f1-motorsport-data.p.rapidapi.com/schedule?year=${year}`,
        headers: {
            'x-rapidapi-host': 'f1-motorsport-data.p.rapidapi.com',
            'x-rapidapi-key': '2f03986286msha981d712b792d06p1ae745jsnd535ea536672',
        },
    };
    try {
        const response = yield axios_1.default.request(options);
        const race = response.data.results.find((r) => r.race_name === raceName);
        if (race && race.winner) {
            res.json({ winner: race.winner });
        }
        else {
            res.status(404).json({ message: 'Race not found or winner not available' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching race data' });
    }
}));
app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
