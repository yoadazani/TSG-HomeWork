import {useEffect, useState} from "react";
import {useCountriesStore} from "@/store/countries.store.ts";


export const usePagination = () => {
    const {totalPages: count, fetchCountries} = useCountriesStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const next = () => {
        setCurrentPage((prev: number) => {
            return prev < count ? prev + 1 : prev
        })
    }

    const prev = () => {
        setCurrentPage((prev: number) => {
            return prev > 1 ? prev - 1 : prev
        })
    }

    useEffect(() => {
        (async () => {
            await fetchCountries(currentPage, limit);
        })()
    }, [currentPage, limit]);

    return {
        currentPage,
        setCurrentPage,
        limit,
        setLimit,
        next,
        prev,
        totalPages: count
    }
}
