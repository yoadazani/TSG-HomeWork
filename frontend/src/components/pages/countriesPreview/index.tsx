import React from 'react';
import styles from "./countriesPreview.module.css";
import {CountryType} from "@/types/CountryType.ts";
import CountryCard from "@/components/shared/countryCard";
import PaginationBtn from "@/components/shared/paginationBtn";

const CountriesPreview = ({countries}: { countries: CountryType[] }) => {

    return (
            <div className={styles.countries_preview}>
                <div className={styles.countries_header}>
                    <h1 className={styles.countries_title}>Countries Overview</h1>
                    <PaginationBtn />
                </div>
                <div className={styles.countries_grid}>
                    {countries?.map(country => (
                       <CountryCard country={country} key={country.name}/>
                    ))}
                </div>
            </div>
    );
};

export default CountriesPreview;