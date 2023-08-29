import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";

import sendPushChatMessage from "../utils/sendPushChatMessage";
import Button from './Button';

export default function Input() {
    const { address } = useAccount();

    const [textInp, setTextInp] = useState("");
    const [loadMsg, setLoadMsg] = useState(null);

    const sendMessage = async () => {
        if (textInp.length >= 10) {
            await sendPushChatMessage(textInp, null, setLoadMsg)
        }
        else {
            toast.error("Messages should be minimum of 10 characters!", {
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

    return (

        <div className='w-full flex flex-col gap-3 justify-center items-center'>
            <input
                type="text"
                placeholder="Discuss something with your team..."
                className="text-white/90 text-sm font-medium placeholder:text-darkBlue/70 outline-none border-2 border-darkBlue bg-darkBlue/10 rounded-10 rounded-t-none px-3 py-2 w-full"
                value={textInp}
                onChange={(e) => setTextInp(e.target.value)}
                onKeyDown={async (e) => { if (e.key === "Enter") { await sendMessage() } }}
            />
            <div className='w-full flex flex-row gap-3 justify-center items-center'>
                <Button onClick={sendMessage} styles="w-full text-xs">{loadMsg ? loadMsg : "Send Message"}</Button>
                <Button styles="w-full text-xs">{loadMsg ? loadMsg : "Join Voice"}</Button>
            </div>
        </div>
    );
}
