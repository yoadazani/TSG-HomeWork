import React, {useEffect} from 'react';
import styles from "./countryDetails.module.css";
import {useParams} from "react-router-dom";
import {useCountriesStore} from "@/store/countries.store.ts";
import CountryInfo from "@/components/shared/countryInfo";
import CountryEditForm from "@/components/shared/countryEditForm";

const CountryDetails = () => {
    const {fetchCountry, country} = useCountriesStore();
    const {countryName} = useParams();


    useEffect(() => {
        (async () => {
            await fetchCountry(countryName as string);
        })()
    }, [countryName]);

    return (
        <div className={styles.container}>
            <div className={styles.country_details}>
                <h1 className={styles.country_name}>{country.name}</h1>
                <div className={styles.content_wrapper}>
                    <div className={styles.flag_container}>
                        <img className={styles.flag} src={country.flagUrl} alt={`Flag of ${country.name}`}/>
                    </div>
                    <div className={styles.info_and_edit}>

                        <CountryInfo
                            region={country.region}
                            subregion={country.subregion}
                            timezone={country.timezone}
                            continent={country.continent}
                        />

                        <CountryEditForm
                            population={country.population}
                            capital={country.capital}
                            countryName={countryName as string}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryDetails;