import {Country, sequelize} from "../db/connectDB";
import axios from 'axios'
import {CountryType} from "../types/CountryType";
import {Request, Response, NextFunction} from "express";


async function populateDatabaseIfEmpty(req: Request, res: Response, next: NextFunction) {
    try {
        await sequelize.sync();

        // Check if the database is empty
        const count = await Country.count();

        if (count === 0) {
            console.log('Database is empty. Populating with countries...');

            // Fetch countries from the API
            const response = await axios.get(process.env.COUNTRIES_URL!);
            const countries = response.data;

            // Prepare the data for bulk insert
            const countryData = countries.map((country: CountryType) => ({
                name: country.name.common,
                capital: country.capital ? country.capital[0] : null,
                region: country.region,
                subregion: country.subregion,
                population: country.population,
                continent: country.continents[0],
                timezone: country.timezones[0],
                flagUrl: country.flags.png || country.flags.svg,
            }));

            // Bulk insert the data
            await Country.bulkCreate(countryData);
        } else {
            console.log(`Database already contains ${count} countries. Skipping population.`);
        }

        next();
    } catch (error) {
        console.error('Error populating database:', error);
        next(error)
    }
}

export { populateDatabaseIfEmpty };