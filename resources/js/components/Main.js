import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layouts/Layout';
import Home from './layouts/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function Main() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
            </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Main;

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}
