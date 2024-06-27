export type CountryType = {
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