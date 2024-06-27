import {Request, Response} from 'express';
import {getCountries, getCountryDetails, getTotalCountries, updateCountryDetails} from "../modules/countries.module";

const fetchCountries = async (req: Request, res: Response) => {
    const {page = 1, limit = 10} = req.query
    // Check if page and limit are valid numbers and not NaN
    if (isNaN(+page) || isNaN(+limit)) throw new Error("Invalid page or limit")

    try {
        const countries = await getCountries(+page, +limit)
        const totalCountries = await getTotalCountries()

        res.json({
            countries,
            totalPages: Math.ceil(totalCountries / +limit)
        }).status(200)
    } catch (error: Error | any) {
        const err = error as Error
        throw new Error("Error fetching countries" + err.message)
    }
}

const fetchSingleCountry = async (req: Request, res: Response) => {
    try {
        const country = await getCountryDetails(req.params.name)
        res.json(country).status(200)
    } catch (error: Error | any) {
        const err = error as Error
        throw new Error("Error fetching country" + err.message)
    }
}

const updateCountry = async (req: Request, res: Response) => {
    try {
        const countryUpdated = await updateCountryDetails(req.params.name, req.body)
        res.json(countryUpdated).status(204)
    } catch (error: Error | any) {
        const err = error as Error
        throw new Error("Error updating country" + err.message)
    }
}


export {
    fetchCountries,
    fetchSingleCountry,
    updateCountry
}