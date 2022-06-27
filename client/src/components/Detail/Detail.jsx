import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleanDetail, cleanPokemons } from "../../actions";
import { useEffect } from "react";
import noImage from '../../img/noImage.jpeg';
import Loading from "../Loading/Loading";

const Detail = () => {
    const dispatch = useDispatch();
    const myPokemon = useSelector((state) => state.pokeDetail);
    const params = useParams()
  console.log(params)
  useEffect(() => {
    dispatch(getDetail(params.id));
    console.log("get details")
    return () => {
      dispatch(cleanDetail(dispatch), cleanPokemons(dispatch));
    };
  }, [dispatch, params]);

    
    return (
        <div>
          {myPokemon.length > 0 ? (
            <div>
              <h2>Name: {myPokemon[0].name}</h2>
              <p>#{myPokemon[0].id}</p>
              <img
                src={myPokemon[0].img ? myPokemon[0].img : noImage}
                alt="img not found" /* alt="250px" width="200px" */
              />
              <h3>
                Types:{" "}
                {myPokemon[0].types?.map((e) => {
                  return <p key={e.name}>{e.name}</p>;
                })}{" "}
              </h3>
              <h5>HP:{myPokemon[0].hp}</h5>
              <h5>Attack:{myPokemon[0].attack}</h5>
              <h5>Defense:{myPokemon[0].defense}</h5>
              <h5>Speed:{myPokemon[0].speed}</h5>
              <h5>Height:{myPokemon[0].height}</h5>
              <h5>Weight:{myPokemon[0].weight}</h5>
            </div>
          ) : (
            <div>
              <Loading />
            </div>
          )}
          <Link to="/home">Go Back</Link>
        </div>
      );
    };
 
export default Detail;

