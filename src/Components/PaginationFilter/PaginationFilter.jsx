import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { API_URL } from '../../config/constants';
import './PaginationFilter.css'

const ITEMS_PER_PAGE = 5;

const PaginationFilter = ({ setElements, elementName, url, allElementsUrl, formData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [numberPages, setNumberPages] = useState(1);


    useEffect(() => {
        axios.post(API_URL + allElementsUrl, formData)
            .then(result => {
                setNumberPages(Math.ceil(result.data[`${elementName}`].length / ITEMS_PER_PAGE));
            })
    }, [])
    const next = () => {
        let newPage = currentPage + 1;
        setCurrentPage(newPage);
        axios.post(API_URL + url + newPage, formData)
            .then(result => {
                setElements(result.data[`${elementName}`]);
            })

        window.scroll(0, 0);
    };

    const previous = () => {
        let newPage = currentPage - 1;
        setCurrentPage(newPage);
        axios.post(API_URL + url + newPage, formData)
            .then(result => {
                setElements(result.data[`${elementName}`]);
            })
        window.scroll(0, 0);
    };

    const goToPage = (page) => {
        setCurrentPage(page);
        axios.post(API_URL + url + page, formData)
            .then(result => {
                setElements(result.data[`${elementName}`]);
            })
        window.scroll(0, 0);
    };

    return (
        <nav aria-label="..." className='mt-4 d-flex justify-content-center bg-transparent shadow-none  myPagination'>
            <ul className="pagination bg-transparent">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <span onClick={previous} class="page-link">Previous</span>
                </li>
                {new Array(numberPages).fill(0).map((elt, index) => (
                    <li key={index} className={`page-item ${(index + 1) === currentPage ? "active" : ""}`} aria-current="page">
                        <span onClick={() => goToPage(index + 1)} className="page-link">{index + 1}</span>
                    </li>
                ))}
                <li className={`page-item ${currentPage === numberPages ? "disabled" : ""}`}>
                    <span className="page-link" onClick={next}>Next</span>
                </li>
            </ul>
        </nav>
    )
}

export default PaginationFilter;
