import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layouts/Layout';
import Home from './layouts/Home';
import About from './layouts/About';
import Login from './layouts/Auth/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext,useState } from 'react';
import Context from '../Context';
function Main() {

    const [auth,setAuth] = useState(false);
    const [user,setUser] = useState([]);
    return (
        <Context.Provider value={{}}>
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={<Login />} />
                </Route>
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    );
}

export default Main;

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}
