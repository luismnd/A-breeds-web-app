import { Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing.js';
import Home from './components/Home/Home.js';
import Create from './components/Create/Create.js';
import Detail from './components/Detail/Detail.js'
import { getBreeds, getTemperaments } from './Redux/actions/index.js'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function App(){
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getBreeds())
      dispatch(getTemperaments())
    }, [dispatch])

    return(
        <>
        <div className='body'>
                <Routes>
                    <Route exact path="/"     element={<Landing />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/create" element={<Create />} />
                    <Route exact path="/dogs/:id" element={<Detail />} />
                </Routes>

        </div>
        </>
    )
};