import React, { useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./screens/Home";
import ProductPage from "./screens/ProductPage";
import Cart from "./screens/Cart";

import AgentHome from "./screens/agent/AgentHome";
import AgentComms from "./screens/agent/AgentComms";
import AgentStore from "./screens/agent/AgentStore";

function App() {

    const [loading, setLoading] = useState(false);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/purchase",
            element: <ProductPage />,
        },
        {
            path: "/cart",
            element: <Cart />,
        },
        {
            path: "/1693162385660",
            element: <AgentHome />,
        },
        {
            path: "/1693162403504",
            element: <AgentComms />,
        },
        {
            path: "/1693162414059",
            element: <AgentStore />,
        },
    ]);

    return (
        // <div className="lexend text-white bg-bgGradient flex flex-col text-primaryblack font-primary pt-[20px] min-h-screen relative overflow-hidden">
        <>

            <ToastContainer />

            {
                loading
                    ? <div className="w-full h-full flex-1 grid place-content-center">
                        {/* <Loader varient="full" theme='light' /> */}
                        <p className='text-primaryBlack/50 text-xl font-medium mt-3'>Loading...</p>
                    </div>
                    : <RouterProvider router={router} />
            }

        </>

        // </div>
    )
}


export default App;
