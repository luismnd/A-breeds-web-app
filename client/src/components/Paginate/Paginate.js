import './Paginate.css'
import React from "react";

export default function Paginate({breedsPerPage, allBreeds, paginate}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allBreeds / breedsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <ul key={number} className="page-item">
            <a key={number} href="#" onClick={() => paginate(number)} >{number}</a>
          </ul>
        ))}
      </ul>
    </nav>
  );


}