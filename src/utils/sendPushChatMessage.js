import { toast } from "react-toastify";
import { ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";

export default async function sendPushChatMessage(textInp, processId, setLoadMsg) {
    setLoadMsg("Sending...");
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            const user = await PushAPI.user.get({
                account: `eip155:${accounts[0]}`,
                env: "staging",
            });

            // need to decrypt the encryptedPvtKey to pass in the api using helper function
            const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
                encryptedPGPPrivateKey: user.encryptedPrivateKey,
                signer: signer,
            });

            // actual api
            await PushAPI.chat.send({
                messageContent: `${textInp}`,
                messageType: "Text",
                // receiverAddress: `a4beae9066f324975c6eb79977aec39186bf6c6e83a74c05ba2f3ad3feba31d7`,
                // receiverAddress: `24df75e370c5e92a55b3ad093df183c4045d122a920790b09ee4aa5d002d6f2e`,
                // receiverAddress: process.env.REACT_APP_PUSH_CHAT_ID,
                receiverAddress: processId ? processId : process.env.REACT_APP_PUSH_CHAT_ID,
                signer: signer,
                pgpPrivateKey: pgpDecryptedPvtKey,
                env: "staging",
            });

            setLoadMsg(null);
            toast.success("Message was sent successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            console.log("Ethereum object doesn't exist!");
            setLoadMsg(null);
            toast.error("Some problem with Metamask! Please try again", {
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
    } catch (error) {
        console.log(error);
        setLoadMsg(null);
        toast.error("Some error was encountered while sending the message !", {
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
