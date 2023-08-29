import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Err404 from "../assets/Err404.svg";
import Button from '../components/Button';

export default function Error404() {

    useEffect(() => {
        document.body.style.overflowY = "auto";
    }, [])

    return (
        <div className="w-screen flex-1 flex flex-col justify-center items-center">

            <img src={Err404} className="h-[calc((100vh-20px)*3/4)] w-full" />

            <p className='text-2xl font-medium mt-3 lg:w-1/2 text-center mb-5'>Looks like the page you are looking for doesn't exists or is shifted to a new address</p>

            <Link to="/"><Button varient="dark" gradient={false} weight={"bold"}>← Go Back</Button></Link>

        </div>
    )
}
