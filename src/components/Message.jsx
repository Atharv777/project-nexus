import React, { useState } from 'react';
import Map from './Map';

export default function Message({ data, openModal, setOpenModal }) {

    const formatString = () => {

        const arr1 = data.message.split("***");
        if (arr1.length === 4) {
            const arr = arr1[1].split(/(@)/);
            let arr2 = arr1[1].split(/(@)/);
            const dta = []
            arr2.map((item, index) => {
                if (item === "@") {
                    arr2 = arr2.splice(index + 1, 1)
                    dta.push(<span className="text-lightpink font-semibold">{item}{arr[index + 1].slice(0, 7)}...{arr[index + 1].slice(-7, arr[index + 1].length)}</span>)
                }
                else {
                    dta.push(<span className="text-red font-semibold">{item}</span>)
                }
            });
            dta.push(<span onClick={() => { setOpenModal(JSON.parse(arr1[2])) }} className='ml-4 text-darkBlue font-extrabold text-base  cursor-pointer'><span className="text-red font-semibold">[</span>View Location<span className="text-red font-semibold">]</span></span>)
            return dta;
        }
        else {
            const arr = data.message.split(/(@)/);
            let arr2 = data.message.split(/(@)/);
            const dta = []
            arr2.map((item, index) => {
                if (item === "@") {
                    arr2 = arr2.splice(index + 1, 1)
                    dta.push(<span className="text-darkBlue">{item}{arr[index + 1].slice(0, 5)}...{arr[index + 1].slice(-5, arr[index + 1].length)}</span>)
                }
                else {
                    dta.push(item)
                }
            });
            return dta;
        }

    }


    return (
        <>
            <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-row gap-2">
                    <p className="text-xs font-bold text-darkBlue">{data.from}</p>
                    <p className='text-xs font-light text-lightpink/70'>
                        {new Date(parseInt(data.timestamp)).toLocaleString("default", {
                            day: "numeric",
                            month: "2-digit",
                        })}
                        {" "}
                        {new Date(parseInt(data.timestamp)).toLocaleTimeString("en-us", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>
                <p className="text-white text-sm">
                    {
                        formatString().map((item) => {
                            return (item)
                        })
                    }
                </p>
            </div>

        </>
    )
}