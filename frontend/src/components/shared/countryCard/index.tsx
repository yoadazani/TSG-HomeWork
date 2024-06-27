import React from 'react';
import {Link} from "react-router-dom";
import styles from "./countryCard.module.css";
import {CountryCardProps} from "@/types/CountryPreviewProps.ts";
const CountryCard = (props: CountryCardProps) => {
    const {country} = props

    return (
        <div key={country.name} className={styles.country_card}>
            <h2 className={styles.country_name}>{country.name}</h2>
            <div className={styles.country_info}>
                <span className={styles.info_label}>Capital:</span>
                {country.capital}
            </div>
            <div className={styles.country_info}>
                <span className={styles.info_label}>Region:</span>
                {country.region}
            </div>
            <div className={styles.country_info}>
                <span className={styles.info_label}>Sub-region:</span>
                {country.subregion}
            </div>
            <div className={styles.country_info}>
                <span className={styles.info_label}>Population:</span>
                {country.population.toLocaleString()}
            </div>
            <Link to={`/countries/${country.name}`} className={styles.details_link}>
                View Details
            </Link>
        </div>
    );
};

export default CountryCard;