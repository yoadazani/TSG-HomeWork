import { Request, Response } from 'express';
import {
    fetchCountries,
    fetchSingleCountry,
    updateCountry
} from '../controllers/countries.controller';
import {
    getCountries,
    getCountryDetails,
    updateCountryDetails,
    getTotalCountries
} from "../modules/countries.module";

// Mocking the imported functions
jest.mock("../modules/countries.module");

// Define CountryType
type CountryType = {
    name: {
        common: string;
    };
    capital: string[];
    region: string;
    subregion: string;
    population: number;
    continents: string[];
    timezones: string[];
    flags: {
        png: string;
        svg: string;
    };
}

describe('Country Controller', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseObject: any;

    beforeEach(() => {
        mockRequest = {};
        responseObject = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        };
        mockResponse = responseObject;
    });

    const mockCountry1: CountryType = {
        name: { common: 'Country1' },
        capital: ['Capital1'],
        region: 'Region1',
        subregion: 'Subregion1',
        population: 1000000,
        continents: ['Continent1'],
        timezones: ['UTC+01:00'],
        flags: {
            png: 'https://example.com/flag1.png',
            svg: 'https://example.com/flag1.svg'
        }
    };

    const mockCountry2: CountryType = {
        name: { common: 'Country2' },
        capital: ['Capital2'],
        region: 'Region2',
        subregion: 'Subregion2',
        population: 2000000,
        continents: ['Continent2'],
        timezones: ['UTC+02:00'],
        flags: {
            png: 'https://example.com/flag2.png',
            svg: 'https://example.com/flag2.svg'
        }
    };

    describe('fetchCountries', () => {
        it('should fetch countries successfully', async () => {
            mockRequest.query = { page: '1', limit: '10' };
            (getCountries as jest.Mock).mockResolvedValue([mockCountry1, mockCountry2]);
            (getTotalCountries as jest.Mock).mockResolvedValue(20);

            await fetchCountries(mockRequest as Request, mockResponse as Response);

            expect(getCountries).toHaveBeenCalledWith(1, 10);
            expect(getTotalCountries).toHaveBeenCalled();
            expect(responseObject.json).toHaveBeenCalledWith({
                countries: [mockCountry1, mockCountry2],
                totalPages: 2
            });
            expect(responseObject.status).toHaveBeenCalledWith(200);
        });

        it('should handle invalid page or limit', async () => {
            mockRequest.query = { page: 'invalid', limit: '10' };

            await expect(fetchCountries(mockRequest as Request, mockResponse as Response)).rejects.toThrowError('Invalid page or limit');
        });
    });

    describe('fetchSingleCountry', () => {
        it('should fetch a single country successfully', async () => {
            mockRequest.params = { name: 'Country1' };
            (getCountryDetails as jest.Mock).mockResolvedValue(mockCountry1);

            await fetchSingleCountry(mockRequest as Request, mockResponse as Response);

            expect(getCountryDetails).toHaveBeenCalledWith('Country1');
            expect(responseObject.json).toHaveBeenCalledWith(mockCountry1);
            expect(responseObject.status).toHaveBeenCalledWith(200);
        });

        it('should handle errors when fetching a single country', async () => {
            mockRequest.params = { name: 'NonExistentCountry' };
            (getCountryDetails as jest.Mock).mockRejectedValue(new Error('Country not found'));

            await expect(fetchSingleCountry(mockRequest as Request, mockResponse as Response)).rejects.toThrow('Error fetching country');
        });
    });

    describe('updateCountry', () => {
        it('should update a country successfully', async () => {
            mockRequest.params = { name: 'Country1' };
            const updateData = { population: 1500000 };
            mockRequest.body = updateData;
            const updatedCountry = { ...mockCountry1, ...updateData };
            (updateCountryDetails as jest.Mock).mockResolvedValue(updatedCountry);

            await updateCountry(mockRequest as Request, mockResponse as Response);

            expect(updateCountryDetails).toHaveBeenCalledWith('Country1', updateData);
            expect(responseObject.json).toHaveBeenCalledWith(updatedCountry);
            expect(responseObject.status).toHaveBeenCalledWith(204);
        });

        it('should handle errors when updating a country', async () => {
            mockRequest.params = { name: 'NonExistentCountry' };
            mockRequest.body = { population: 2000000 };
            (updateCountryDetails as jest.Mock).mockRejectedValue(new Error('Country not found'));

            await expect(updateCountry(mockRequest as Request, mockResponse as Response)).rejects.toThrow('Error updating country');
        });
    });
});