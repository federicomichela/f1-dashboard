import { API } from "@/services/APIService";
import { F1Race, F1Competition } from "f1-interfaces/interfaces";

class Formula1Service {
    // Fetch the races schedule for the specified year
    async getRaces(year: number):Promise<{ races: F1Race[] }> {
        return await API.get<{ races: F1Race[] }>(`/api/races`, {
            year,
        });
    }

    async getCompetitions(raceId: string):Promise<{ competitions: F1Competition[] }> {
        return await API.get<{ competitions: F1Competition[] }>(`/api/races/${raceId}/competitions`);
    }
}

export const F1Service = new Formula1Service();
