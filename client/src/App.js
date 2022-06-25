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


function App() {
  return (

<Routes>
  
  <Route path ='/' element={<LandingPage/>} />
  <Route path ='/home' element={<Home/>}/>


</Routes>

);
}

export default App;

