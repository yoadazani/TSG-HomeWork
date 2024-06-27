import axios, {AxiosError} from "axios";
import baseApiUrl from "./baseUrl.ts";
import {CountryType} from "@/types/CountryType.ts";

const getAll = async (page?: number, limit?: number) => {
    try {
        const url = baseApiUrl(`/countries?page=${page!}&limit=${limit!}`);
        const response = await axios.get(url);

        const {countries, totalPages} = response.data;

        return {countries, totalPages};

    } catch (error: AxiosError | any) {
        const errorMessage = error.message;
        throw new Error(errorMessage);
    }
};

const getByName = async (countryName: string) => {
    try {
        const url = baseApiUrl(`/countries/${countryName}`);
        const response = await axios.get(url);
        return response.data;
    } catch (error: AxiosError | any) {
        const errorMessage = error.message;
        throw new Error(errorMessage);
    }
};

const update = async (countryName: string, data: Partial<CountryType>) => {
    try {
        const url = baseApiUrl(`/countries/${countryName}`);
        const response = await axios.put(url, data);
        return response.data;
    } catch (error: AxiosError | any) {
        const errorMessage = error.message;
        throw new Error(errorMessage);
    }
};



export {
    getAll,
    getByName,
    update
}