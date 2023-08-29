import React, { useEffect, useRef, useState, useMemo } from 'react';

import { Link, NavLink } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';

import logo from "../../assets/text-logo.svg";
import grid from "../../assets/bg-grid.svg";

import getChatHistory from "../../utils/getChatHistory"
import sendPushChatMessage from "../../utils/sendPushChatMessage";

import Input from '../../components/Input';
import Message from '../../components/Message';
import Button from '../../components/Button';
import Map from '../../components/Map';
import Error404 from "../Error404"

export default function AgentComms() {


    const { address, isConnected } = useAccount();
    const [msgData, setMsgData] = useState(null)
    const [loading, setLoading] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const scrollEndDiv = useRef(null);

    useEffect(() => {
        if (scrollEndDiv.current) {
            scrollEndDiv.current.scrollIntoView({ block: "end" })
        }
    }, [msgData])


    const fetchData = async () => {
        const chatHistory = await getChatHistory(setLoading, null, 20);
        if (chatHistory.status === "Success") {
            setMsgData(chatHistory.data);
        } else {
            if (chatHistory.data.msg === "No Messages Found!") {
                setMsgData([])
            }

            toast.error(chatHistory.data.msg, {
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
    };

    const [loadMsg, setLoadMsg] = useState(null);
    const sendLocation = async () => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const latLng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            await sendPushChatMessage(`*** ***${JSON.stringify(latLng)}***`, null, setLoadMsg);
        })
    }

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
                            <div className='w-full h-[70vh] max-h-[70vh] rounded-30 bg-dark66 border-primary py-20 px-20 backdrop-blur flex flex-col justify-between items-center gap-5'>
                                <Map />
                                <Button onClick={sendLocation} styles="w-full bg-red text-xs">{loadMsg ? loadMsg : "Send location over chat"}</Button>
                            </div>
                            <div className='w-full h-[70vh] max-h-[70vh] rounded-30 bg-dark75 border-primary py-20 px-20 backdrop-blur flex flex-col justify-between items-center gap-5'>
                                {
                                    loading
                                        ? <p className='m-auto text-sm font-medium text-lightpink/70'>Sign a message on your wallet to decrypt the texts...</p>
                                        : msgData
                                            ? msgData.length > 0
                                                ? <>
                                                    <div className='flex-1 w-full overflow-auto flex flex-col gap-5 items-center'>
                                                        {msgData?.map((item, _) => {
                                                            return <Message key={_} openModal={openModal} setOpenModal={setOpenModal} data={item} />;
                                                        })}
                                                        <div ref={scrollEndDiv}></div>
                                                    </div>
                                                    <Input />
                                                </>
                                                : <>
                                                    <p style={{ textAlign: "center" }}>No messages found</p>
                                                    <Input />
                                                </>
                                            : <>
                                                <Button onClick={async () => await fetchData()} styles="w-max my-auto">Decrypt Messages</Button>
                                                <Input />
                                            </>
                                }

                            </div>
                        </div>
                        <img src={grid} className='absolute bottom-[-9vw] right-0 w-[65vw]' />
                        {openModal && <MapModal openModal={openModal} setOpenModal={setOpenModal} />}
                    </>
                    : <Error404 />

            }
        </div>

    )
}

const MapModal = ({ openModal, setOpenModal }) => {

    return (
        <div
            onClick={() => {
                setOpenModal(false);
            }}
            className="absolute top-0 left-0 z-[100] w-screen h-screen flex justify-center items-center bg-black/70 md:px-20"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full lg:w-3/4 h-[80vh]"
            >
                <Map zoom={17} centerCoordinates={openModal} />
            </div>
        </div>
    )
}