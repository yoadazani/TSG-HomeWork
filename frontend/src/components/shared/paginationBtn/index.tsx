import React from 'react';
import styles from "@/components/shared/paginationBtn/paginationBtn.module.css";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {usePagination} from "@/hooks/usePagination.ts";

const PaginationBtn = () => {
    const {next, prev, currentPage, totalPages} = usePagination();

    return (
        <div className={styles.countries_pagination}>
            {/*prev button*/}
            <button onClick={prev} disabled={currentPage === 1}>
                <FaArrowLeft/>
            </button>

            {/*current page number*/}
            <p>{currentPage} of {totalPages}</p>

            {/*next button*/}
            <button onClick={next} disabled={currentPage === totalPages}>
                <FaArrowRight/>
            </button>
        </div>
    );
};

export default PaginationBtn;