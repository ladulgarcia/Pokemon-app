import React from "react";
//import { Link } from "react-router-dom";
//import hooks from react
import {useState , useEffect} from "react";
//import hooks from react-redux (install npm i react-redux)
import {useDispatch,useSelector} from "react-redux";
//importo actions to be used withing this component
import { getPokemons, cleanPokemons } from "../../actions";

//import components to be used in Home
import Card from "../Card/Card";
import Pagination from '../Pagination/Pagination';
import Nav from '../Nav/Nav';
import Filters from '../Filters/Filters';
import Loading from '../Loading/Loading';

export default function Home() {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)
    
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, /* setPokemonsPerPage */] = useState(12);
    const [/* order */, setOrder] = useState('');
    const indexOfLastPokemon = currentPage * pokemonsPerPage; //12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    // console.log(allPokemons);
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const pagination = pageNumber => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(cleanPokemons(dispatch));
        dispatch(getPokemons());
    }


    return(
        <div>
            { allPokemons.length > 0 ?
                <div>
                <Nav />
                <div>
                    <h1>PokemonApp</h1>
                </div>
                <div>
                    <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
                </div>
                <div>
                    <button onClick={e => {handleClick(e)}}>Clear filters</button>
                </div>
                <Pagination
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    pagination={pagination}
                />
                {
                    currentPokemons?.map(e => {
                        return(
                            <Card 
                            key={e.id}
                            id={e.id}
                            name={e.name}
                            image={e.img}
                            types={e.types} />
                        )
                    })
                }
                </div> :
                <Loading />
            } 
        </div>
    )
};

