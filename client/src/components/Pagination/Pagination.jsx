import React from "react";

const Pagination = ({pokemonsPerPage, allPokemons, pagination}) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i);        
    }

    return ( 
        <nav>
            <ul>
                {
                    pageNumbers?.map(number => (
                        <li key={number}>
                            <button onClick={() => pagination(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
     );
}
 
export default Pagination;