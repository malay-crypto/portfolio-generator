import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {PortfolioProvider} from "./context/PortfolioProvider.jsx";

createRoot(document.getElementById('root')).render(

        <BrowserRouter>
                <PortfolioProvider>

                         <App />
                 </PortfolioProvider>


        </BrowserRouter>


)
