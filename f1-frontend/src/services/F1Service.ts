import {API} from "@/services/APIService";

export interface F1Schedule {}
export interface F1Race {}
export interface F1Driver {}

class Formula1Service {
    // Fetch the races schedule for the specified year
    async getRacesSchedule(year: string) {
        const result = await API.get<{ schedules: F1Schedule[] }>(`/api/schedules`, {
            year,
        });
        return result.schedules;
    }
}

export const F1Service = new Formula1Service();
