import React from 'react';
import { NavLink } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import logo from "../../assets/text-logo.svg";
import grid from "../../assets/bg-grid.svg";
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

                        <div className='z-1 px-[100px] pt-[100px] w-full h-full flex gap-[40px]'>
                            Agent store
                        </div>
                        <img src={grid} className='absolute bottom-[-9vw] right-0 w-[65vw]' />
                    </>
                    : <Error404 />

            }
        </div>
    )
}