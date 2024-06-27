import React from 'react';
import styles from "@/components/shared/countryInfo/countryInfo.module.css";
import {CountryInfoProps} from "@/types/CountryDetailsProps.ts";

const CountryInfo = (props: CountryInfoProps) => {

    return (
        <div className={styles.info_grid}>
            {
                Object.entries(props).map(([key, value]) => (
                    <div className={styles.info_item}>
                        <div className={styles.info_label}>{key}</div>
                        <div className={styles.info_value}>{value}</div>
                    </div>
                ))
            }
        </div>
    );
};

export default CountryInfo;