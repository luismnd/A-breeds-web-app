import './Home.css';
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds, applyFilters, applySort, applyFilterAdded } from "../../Redux/actions";

import Cards from "../Cards/Cards.js";
import Filter from "../Filter/Filter.js";
import Sorter from "../Sorter/Sorter.js";
import Paginate from "../Paginate/Paginate.js";
import SearchBar from "../SearchBar/SearchBar.js";

export default function Home(){
    const dispatch = useDispatch();
    const allBreeds = useSelector((state) => state.breeds)
    const displayBreeds = useSelector((state) => state.filtered)
    const temperaments = useSelector((state) => state.temperaments)
    
    //-----------------------------------------------------
    // Pagination
    const breedsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastBreed = currentPage * breedsPerPage;
    const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
    const currentBreeds = displayBreeds.slice(indexOfFirstBreed, indexOfLastBreed);
    function paginate(pageNumber){setCurrentPage(pageNumber)};

    //-----------------------------------------------------
    // Fetch data from API - useEffect - componentDidMount
/*     useEffect(() => {
        dispatch(getBreeds());
        dispatch(getTemperaments());
    },[dispatch]); */

    //-----------------------------------------------------
    // Reset
    function handleClick(e){
        e.preventDefault();
        dispatch(getBreeds());
        setCurrentPage(1);
    }

    //-----------------------------------------------------
    // Filtering

    function handleFilter(e){
        e.preventDefault();
        if(e.target.value === "All"){
            dispatch(applySort(allBreeds, sortState));
        } else {
            dispatch(applyFilters(allBreeds, [e.target.value]));
        }
        setCurrentPage(1);
    }

    function handleFilterAdded(e){
        e.preventDefault();
        dispatch(applyFilterAdded(displayBreeds, e.target.value))
        setCurrentPage(1);
    }

    //-----------------------------------------------------
    // Sorting
    const [sortState, setSortState] = useState("Ascending");
    function handleSorter(e){
        e.preventDefault();
        setSortState(e.target.value);
        dispatch(applySort(displayBreeds, e.target.value));
        setCurrentPage(1);
    }

    //-----------------------------------------------------
    // Render
    if(displayBreeds.length>0){return(
        <div className="home">
            <div className="control">
                <div>
                    <h3>Create Breed</h3>
                    <Link to="/create"><button>Go to form</button></Link>
                </div>
                <div>
                    <h3>Search</h3>
                    <SearchBar className="content"/>
                </div>
                <div>
                    <h3>Filtering options</h3>
                    <Filter className="content" temperaments={temperaments} handleFilter={handleFilter} handleFilterAdded={handleFilterAdded} />
                </div>
                <div>
                    <h3>Sorting options</h3>
                    <Sorter className="icon" handleSorter={handleSorter}/>
                </div>
                <div>
                    <h3>Reload Breeds</h3>
                    <button className="icon" onClick={e=>handleClick(e)}>Reload</button>
                </div>
            </div>

            <div className="navigation">

                <div className="displayArea">
                {/* {currentBreeds.map(b => <Card key={b.id} id={b.id} name={b.name} image={b.image} weight={b.weight} temperament={b.temperament} />)} */}
                    <Cards breeds={currentBreeds}/>
                </div>
                <div>
                    <Paginate breedsPerPage={breedsPerPage} allBreeds={displayBreeds.length} paginate = {paginate} />
                </div>
            </div>
        </div>
    )} else {return(
        <>
            <h2>Loading...</h2>
        </>
    )}
};