import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';

import logo from "../../assets/text-logo.svg";
import grid from "../../assets/bg-grid.svg";

import getChatHistory from "../../utils/getChatHistory"
import sendPushChatMessage from "../../utils/sendPushChatMessage"

import Input from '../../components/Input';
import Message from '../../components/Message';
import Button from '../../components/Button';
import Map from '../../components/Map';
import Error404 from "../Error404"


export default function AgentHome() {


    const { address, isConnected } = useAccount();
    const [msgData, setMsgData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [sosLoadMsg, setsosLoadMsg] = useState(null)
    const [nearLoadMsg, setnearLoadMsg] = useState(null)

    const [openModal, setOpenModal] = useState(false)

    const scrollEndDiv = useRef(null);

    useEffect(() => {
        if (scrollEndDiv.current) {
            scrollEndDiv.current.scrollIntoView({ block: "end" })
        }
    }, [msgData])


    const fetchData = async () => {
        const chatHistory = await getChatHistory(setLoading, process.env.REACT_APP_PUSH_CHAT_ID_ANNOUNCEMENT, 20);
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

    const callBackup = () => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const latLng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            await sendPushChatMessage(`***I need HELP, report to the location ASAP, @0x090fdA33Ff13A12251CEb473E5bf05B3A4453dC2***${JSON.stringify(latLng)}***`, process.env.REACT_APP_PUSH_CHAT_ID_ANNOUNCEMENT, setnearLoadMsg);
        })
    }

    const sendSOS = async () => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const latLng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            await sendPushChatMessage(`***URGENT: SOS Alert, Respond ASAP.***${JSON.stringify(latLng)}***`, process.env.REACT_APP_PUSH_CHAT_ID_ANNOUNCEMENT, setsosLoadMsg);
        })
    }

    const TargetData = {
        name: "John Doe",
        age: "25-30",
        gender: "Male",
        height: "6 foot",
        personality: "heavy build",
        lastSeen: "Tagore Garden metro station",
        coordinates: [28.643319, 77.113090]
    }
    // const TargetData = null

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

                        <div className='z-1 px-[100px] pt-[100px] flex flex-col gap-[75px]'>
                            <div className='flex flex-col gap-1 justify-center items-start'>
                                <p className="text-lightpink text-6xl font-bold">Welcome, <span className='text-darkBlue'>{address?.slice(0, 4)}...{address?.slice(-4, address?.length)}</span>.</p>
                                <p className='text-white/60 text-sm font-medium'>This is your secret dashboard, your digital arsenal in the world of shadows.</p>
                            </div>
                            <div className='w-full h-full flex gap-[40px]'>
                                <div className='w-full h-[50vh] max-h-[50vh] rounded-30 bg-dark75 border-primary py-20 px-20 backdrop-blur flex flex-col justify-between items-center gap-5'>
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
                                                        <div className='w-full flex flex-col gap-1 justify-center items-center'>
                                                            {/* <Input /> */}
                                                            <div className='w-full flex flex-row gap-3 justify-center items-center'>
                                                                <Button onClick={callBackup} styles="w-full text-xs">{nearLoadMsg ? nearLoadMsg : "Call for backup"}</Button>
                                                                <Button onClick={sendSOS} styles="w-full bg-red text-xs">{sosLoadMsg ? sosLoadMsg : "Send SOS"}</Button>
                                                            </div>
                                                        </div>
                                                    </>
                                                    : <>
                                                        <p style={{ textAlign: "center" }}>No messages found</p>
                                                        <div className='w-full flex flex-col gap-1 justify-center items-center'>
                                                            {/* <Input /> */}
                                                            <div className='w-full flex flex-row gap-3 justify-center items-center'>
                                                                <Button onClick={callBackup} styles="w-full text-xs">{sosLoadMsg ? sosLoadMsg : "Call for backup"}</Button>
                                                                <Button onClick={sendSOS} styles="w-full bg-red text-xs">{sosLoadMsg ? sosLoadMsg : "Send SOS"}</Button>
                                                            </div>
                                                        </div>
                                                    </>
                                                : <>
                                                    <Button onClick={async () => await fetchData()} styles="w-max my-auto">Decrypt Messages</Button>
                                                    <div className='w-full flex flex-col gap-2 justify-center items-center'>
                                                        {/* <Input /> */}
                                                        <div className='w-full flex flex-row gap-3 justify-center items-center'>
                                                            <Button onClick={callBackup} styles="w-full text-xs">{sosLoadMsg ? sosLoadMsg : "Call for backup"}</Button>
                                                            <Button onClick={sendSOS} styles="w-full bg-red text-xs">{sosLoadMsg ? sosLoadMsg : "Send SOS"}</Button>
                                                        </div>
                                                    </div>
                                                </>
                                    }



                                </div>
                                <div className='w-full h-[50vh] max-h-[50vh] flex flex-col justify-center items-center gap-7'>
                                    {
                                        TargetData
                                            ? <><div className='w-full h-full rounded-30 bg-dark75 border-primary py-20 p-30 backdrop-blur flex flex-col justify-between items-start gap-2 text-base font-medium text-darkpink'>
                                                <div className='flex items-center gap-4 w-full'>
                                                    <p><span className='text-white'>Target:</span> {TargetData.name}</p>
                                                    <hr className="h-[2px] w-full flex-1 text-darkpink" />
                                                </div>
                                                <p>{TargetData.age} <span className='text-white'>years old,</span> {TargetData.gender}</p>
                                                <p><span className='text-white'>About</span> {TargetData.height}<span className='text-white'>,</span> {TargetData.personality}</p>
                                                <p><span className='text-white'>Last seen at</span> {TargetData.lastSeen}</p>
                                            </div>
                                                <div className='w-3/4 h-full'>
                                                    <Map zoom={14} centerCoordinates={{ lat: TargetData.coordinates[0], lng: TargetData.coordinates[1] }} />
                                                </div></>
                                            : <div className='w-full h-full rounded-30 bg-dark75 border-primary py-20 p-30 backdrop-blur flex flex-col justify-center items-center gap-2 text-xl font-semibold text-darkpink'>
                                                <p>No active targets detected!</p>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <img draggable={false} src={grid} className='absolute bottom-[-9vw] right-0 w-[65vw] z-0' />
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