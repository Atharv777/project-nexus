import React from 'react';
import { NavLink } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import logo from "../../assets/text-logo.svg";
import grid from "../../assets/bg-grid.svg";
import suitcase from "../../assets/suitcase.png";
import glass from "../../assets/glasses.png";
import earbuds from "../../assets/earbuds.png";
import pen from "../../assets/pen.png";
import Error404 from "../Error404"

export default function AgentStore() {

    const { address, isConnected } = useAccount();
    return (

        <div className="lexend text-white bg-bgGradient flex flex-col text-primaryblack font-primary pt-[20px] min-h-screen relative overflow-hidden">
            {
                isConnected
                    ? <>
                        <div className='z-1 flex w-screen px-[100px] py-20 justify-between items-center'>
                            <img src={logo} alt="" className='h-9 w-auto' />
                            <div className='flex justify-center items-center gap-20'>
                                <NavLink to="/1693162385660" className="text-lightpink text-lg"><p>Home</p></NavLink>
                                <NavLink to="/1693162403504" className="text-lightpink text-lg"><p>Communication</p></NavLink>
                                <NavLink to="/1693162414059" className="text-lightpink text-lg"><p>Spyware</p></NavLink>
                            </div>
                            <ConnectButton />
                        </div>

                        <div className='z-1 px-[100px] pt-[100px] w-full h-full flex justify-center gap-[40px] flex-wrap'>
                            <div className='w-[400px] h-auto rounded-40 bg-dark75 border-primary py-20 pb-30 px-20 backdrop-blur flex flex-col justify-center items-center gap-[40px]'>
                                <img src={suitcase} className='w-full rounded-20' />
                                <div className="flex flex-col gap-1">
                                    <p className='text-lg text-white90 font-medium'>Nexus Suitcase</p>
                                    <p className='text-xs text-white/50 font-light'>A secure hardened suitcase with hidden camera inside.</p>
                                </div>
                            </div>
                            <div className='w-[400px] h-auto rounded-40 bg-dark75 border-primary py-20 pb-30 px-20 backdrop-blur flex flex-col justify-center items-center gap-[40px]'>
                                <img src={glass} className='w-full rounded-20' />
                                <div className="flex flex-col gap-1">
                                    <p className='text-lg text-white90 font-medium'>Nexus Spy Glasses</p>
                                    <p className='text-xs text-white/50 font-light'>A futuristic digital sunglasses with integrated holographic-screen.</p>
                                </div>
                            </div>
                            <div className='w-[400px] h-auto rounded-40 bg-dark75 border-primary py-20 pb-30 px-20 backdrop-blur flex flex-col justify-center items-center gap-[40px]'>
                                <img src={earbuds} className='w-full rounded-20' />
                                <div className="flex flex-col gap-1">
                                    <p className='text-lg text-white90 font-medium'>Nexus Earbuds</p>
                                    <p className='text-xs text-white/50 font-light'>A comfortable earbud which seamlessly hides within the ear.</p>
                                </div>
                            </div>
                            <div className='w-[400px] h-auto rounded-40 bg-dark75 border-primary py-20 pb-30 px-20 backdrop-blur flex flex-col justify-center items-center gap-[40px]'>
                                <img src={pen} className='w-full rounded-20' />
                                <div className="flex flex-col gap-1">
                                    <p className='text-lg text-white90 font-medium'>Nexus Smoke Pen</p>
                                    <p className='text-xs text-white/50 font-light'>A smoke pen which generates dense smoke, helpful in escaping scene.</p>
                                </div>
                            </div>
                        </div>
                        <img src={grid} className='absolute bottom-[-9vw] right-0 w-[65vw]' />
                    </>
                    : <Error404 />

            }
        </div>
    )
}