import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Outlet, RouterProvider } from 'react-router-dom';
import router from './router';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/reset.css';

function Main() {


    useEffect(() => {
    })
    return (
        <>
            <Outlet />
        </>
    );
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render( 
        <React.StrictMode>
            <RouterProvider router={router} /> 
        </React.StrictMode>
        , document.getElementById('root'));
}
