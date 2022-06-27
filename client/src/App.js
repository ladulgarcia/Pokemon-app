import './App.css';
//import App from '/App.css'
import React from 'react';
//importar de react-router:
//import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import { BrowserRouter, Route} from 'react-router-dom'
//import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'

// Components
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import PokemonCreate from './components/PokemonCreate/PokemonCreate';
import Detail from './components/Detail/Detail';


function App() {
  return (

<Routes>
  <Route path ='/' element={<LandingPage/>}/>
  <Route path ='/home' element={<Home/>}/>
  <Route path ='/create' element={<PokemonCreate/>}/>
  <Route path ={`/pokemon/:id`} element={<Detail/>}/>
 {/*  <Route path ='/pokemon/:id' element={<Detail/>}/> */}
</Routes>
);
}

export default App;

