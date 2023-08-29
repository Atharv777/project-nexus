import React from 'react';
import logo from "../assets/logo.svg";
import { Link, NavLink } from 'react-router-dom';

import product from "../assets/product.png"


export default function Home() {
    return (
        <div className="lexend text-black bg-bgWhite flex flex-col inter pt-[20px] min-h-screen relative overflow-hidden">
            <div className='flex w-screen px-[100px] py-20 justify-between items-center'>
                <img src={logo} alt="" className='h-9 w-auto' />
                <div className='flex justify-center items-center gap-20'>
                    <NavLink to="/" className="text-purple font-semibold text-xl"><p>Home</p></NavLink>
                    <NavLink to="/purchase" className="text-purple font-semibold text-xl"><p>Purchase</p></NavLink>
                </div>
            </div>

            <div className='flex justify-between items-center lg:px-50 flex-1'>
                <div className='w-7/12 pr-50'>
                    <img src={product} alt="Nexus Briefcase" className="w-full h-auto" />
                </div>
                <div className='w-5/12 pl-50 flex flex-col justify-center items-center gap-[75px]'>
                    <p className='text-purple text-5xl font-bold'>Not your regular suitcase.</p>

                    <Link to="/purchase" className="hover:scale-105 transition flex w-full py-4 justify-center items-center rounded-full bg-purple text-bgWhite text-lg font-semibold">
                        Buy Now
                    </Link>
                </div>
            </div>
        </div>
    )
}
// const dist = (lat1, long1, lat2, long2) => {
//     const lat1 = ((parseFloat(lat1) * Math.PI) / 180)
//     const long1 = ((parseFloat(long1) * Math.PI) / 180)
//     const lat2 = ((parseFloat(lat2) * Math.PI) / 180)
//     const long2 = ((parseFloat(long2) * Math.PI) / 180)

//     dlon = long2 - long1
//     dlat = lat2 - lat1
//     a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2
//     c = 2 * Math.asin(Math.sqrt(a))
//     km = 6371 * c
//     return km
// }