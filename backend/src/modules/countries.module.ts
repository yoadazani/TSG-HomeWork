import {Country} from "../db/connectDB";
import {Op, UpdateOptions} from 'sequelize';
import {CountryType} from "../types/CountryType";

const getTotalCountries = async () => {
    try {
        return await Country.count();
    } catch (error) {
        throw new Error("Failed to get countries count: " + error);
    }
}

const getCountries = async (page?: number, limit?: number) => {
    try {
        return await Country.findAll({
            limit: limit! || 10,
            offset: (page! - 1) * limit! || 0,
        });
    } catch (error) {
        throw new Error("Failed to get countries: " + error);
    }
}

const getCountryDetails = async (countryName: string) => {
    try {
        const country = await Country.findOne({
            where: {
                name: {
                    // Op.eq is used for equality comparison (=) in Sequelize, that ensures that the name attribute of the Country model is equal to the countryName parameter.
                    [Op.eq]: countryName
                }
            }
        });
        if (country) {
            return country
        } else {
            return {message: "Country not found",};
        }
    } catch (error) {
        throw new Error("Failed to get country details: " + error);
    }
}

const updateCountryDetails = async (countryName: string, updateData: Partial<CountryType>) => {

    try {
        // Check if the country exists
        const country = await getCountryDetails(countryName);

        if (!country) return new Error(`Country ${countryName} not found`);

        // Update the country details in the database
        const [updatedRows] = await Country.update(updateData, {
            where: {
                name: countryName
            }
        } as UpdateOptions);


        if (updatedRows === 0) return new Error(`Failed to update country ${countryName}`);


        return {
            updatedRows,
            message: 'Country updated successfully'
        };

    } catch (error) {
        throw new Error("Failed to update country: " + error);
    }
}


export {getTotalCountries, getCountries, getCountryDetails, updateCountryDetails}