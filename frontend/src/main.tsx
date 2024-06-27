import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.tsx'
import CountryDetails from "./components/pages/countryDetailes";

import './index.css'

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "countries/:countryName",
        element: <CountryDetails/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={routes}/>
    </React.StrictMode>,
)
