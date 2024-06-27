import create from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {getAll, getByName, update} from "@/api/countries.api.ts";
import {CountryType} from "@/types/CountryType.ts";

// Define the initial state
type State = {
    countries: CountryType[]
    country: CountryType,
    totalPages: number
}

type Action = {
    fetchCountries: (page?: number, limit?: number) => Promise<void>
    fetchCountry: (countryName: string) => Promise<void>
    updateCountry: (countryName: string, data: Partial<CountryType>) => Promise<void>
}

// I create the store with Immer middleware
export const useCountriesStore = create<
    State & Action,
    [["zustand/immer", never]],
    State & Action
>(immer((set, get) => ({

    // State
    countries: [],
    country: {},
    totalPages: 1,

    // Actions
    fetchCountries: async (page = 1, limit = 10) => {
        try {

            const fetchedCountries = await getAll(page, limit);

            set({
                countries: fetchedCountries.countries,
                totalPages: fetchedCountries.totalPages
            })

        } catch (error) {
            set({error: error.message})
        } finally {
            set({isLoading: false})
        }
    },

    fetchCountry: async (countryName) => {
        try {
            const fetchedCountry = await getByName(countryName);
            set({country: fetchedCountry})
        } catch (error) {
            set({error: error.message})
        }
    },

    updateCountry: async (countryName, newData) => {
        try {
            const fetchedCountry = await update(countryName, newData);

            if (fetchedCountry.updatedRows > 0) {
                set({country: {...(this.country), ...newData}})
            }
        } catch (error) {
            set({error: error.message})
        }
    },
})));