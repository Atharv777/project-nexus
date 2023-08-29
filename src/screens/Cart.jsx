import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavLink, useNavigate } from 'react-router-dom';

import logo from "../assets/logo.svg";
import product from "../assets/product_group.png"

export default function Cart() {

    const [coupon, setCoupon] = useState("")
    const navigate = useNavigate();

    const validate = () => {
        if (coupon.toLowerCase() === process.env.REACT_APP_SECRET_CODE) {
            const btn = document.querySelector('#xyzxyzxyz')
            btn.click()
            navigate("/1693162385660");
        }
        else {
            toast.error("Invalid or Expired coupon code!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (
        <>
            <div className="lexend text-black bg-bgWhite flex flex-col inter pt-[20px] min-h-screen relative overflow-hidden">
                <div className='flex w-screen px-[100px] py-20 justify-between items-center'>
                    <img src={logo} alt="" className='h-9 w-auto' />
                    <div className='flex justify-center items-center gap-20'>
                        <NavLink to="/" className="text-purple font-semibold text-xl"><p>Home</p></NavLink>
                        <NavLink to="/purchase" className="text-purple font-semibold text-xl"><p>Purchase</p></NavLink>
                    </div>
                </div>

                <div className='flex justify-between items-center lg:px-50 flex-1'>

                    <div className='w-1/2 pr-50 flex flex-col justify-between items-start gap-[50px]'>
                        <p className='text-purple text-5xl font-bold'>NEXUS “Not your regular suitcase.”</p>
                        <p className='text-[#B7AEA4] text-2xl font-bold'>Sorry, We are not shipping our product in your region. </p>

                        <div className='flex flex-col gap-2 w-full'>
                            <p className='text-[#B7AEA4] text-lg font-medium'>Have a coupon code?*</p>
                            <div className='flex flex-row gap-2 w-full'>
                                <input placeholder="XXXXX" value={coupon} onChange={(e) => setCoupon(e.target.value)} type="text" className='px-5 py-4 border border-[#B7AEA4] focus:border-purple bg-bgWhite outline-none rounded-full text-black/70 w-full' />
                                <button onClick={validate} className="flex px-40 py-1 justify-center items-center rounded-full bg-purple text-bgWhite text-lg font-medium">
                                    Apply
                                </button>
                            </div>
                        </div>

                        <button disabled className="cursor-not-allowed flex w-full py-4 justify-center items-center rounded-full bg-[#C7C7C7] text-bgWhite text-lg font-semibold">
                            Proceed to pay
                        </button>

                        <p className='text-[#B7AEA4] text-sm font-medium'>*Out-of-date or expired coupons are not accepted. Check your coupons expiration date before entering.</p>
                    </div>

                    <div className='w-1/2 pl-50'>
                        <img src={product} alt="Nexus Briefcase" className="w-full h-auto" />
                    </div>
                </div>
            </div>

            <ConnectButton.Custom>
                {({ openConnectModal }) => {
                    {
                        return (
                            <button onClick={openConnectModal} type="button" id="xyzxyzxyz"></button>
                        )
                    }
                }}
            </ConnectButton.Custom>
        </>
    )
}