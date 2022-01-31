import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getSearch } from '../../Redux/actions';

export default function SearchBar() {
  const allBreeds = useSelector((state) => state.breeds)
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getSearch(search, allBreeds));
    setSearch("");
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="Search" placeholder="Search breeds..." value={search} onChange={(e) => handleChange(e)}/>
      <button type="submit">Search</button>
    </form>
  )
};