import CountriesPreview from "./components/pages/countriesPreview";
import {useCountriesStore} from "./store/countries.store.ts";
import {usePagination} from "./hooks/usePagination.ts";
import {Suspense} from "react";


function App() {
    const {countries} = useCountriesStore();
    const {currentPage, setCurrentPage, limit, setLimit, totalPages} = usePagination();

    return (
        <Suspense fallback={"Loading..."}>
            <CountriesPreview
                countries={countries}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                setLimit={setLimit}
                totalPages={totalPages}
            />
        </Suspense>
    )
}

export default App
