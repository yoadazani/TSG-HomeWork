import React from 'react';
import styles from "@/components/shared/countryEditForm/countryEditForm.module.css";
import {CountryType} from "@/types/CountryType.ts";
import {useCountriesStore} from "@/store/countries.store.ts";
import {EditFormProps} from "@/types/CountryDetailsProps.ts";

const CountryEditForm = (props : EditFormProps) => {
    const {population, capital, countryName} = props
    const { updateCountry } = useCountriesStore();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // take the form data by inputs name and convert them to simple Object
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Update the country population and capital
        await updateCountry(countryName as string, data as Partial<CountryType>);
    };

    return (
        <form className={styles.edit_form} onSubmit={handleSubmit}>
            <label>
                Population
                <input
                    type="number"
                    name="population"
                    defaultValue={population}
                    placeholder="Enter population"
                />
            </label>
            <label>
                Capital
                <input
                    type="text"
                    name="capital"
                    defaultValue={capital}
                    placeholder="Enter capital"
                />
            </label>
            <button type="submit">Update Country Info</button>
        </form>
    );
};

export default CountryEditForm;