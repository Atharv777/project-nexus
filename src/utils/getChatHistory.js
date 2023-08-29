import { ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";

export default async function getChatHistory(setLoading, processID, limit) {
    setLoading(true);
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

            const Data = []
            // need to decrypt the encryptedPvtKey to pass in the api using helper function
            const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
                encryptedPGPPrivateKey: user.encryptedPrivateKey,
                signer: signer,
            });
            // conversation hash are also called link inside chat messages
            const conversationHash = await PushAPI.chat.conversationHash({
                account: `${accounts[0]}`,
                // conversationId: `a4beae9066f324975c6eb79977aec39186bf6c6e83a74c05ba2f3ad3feba31d7`, // receiver's address or chatId of a group
                // conversationId: `24df75e370c5e92a55b3ad093df183c4045d122a920790b09ee4aa5d002d6f2e`, // receiver's address or chatId of a group
                conversationId: processID ? processID : process.env.REACT_APP_PUSH_CHAT_ID, // receiver's address or chatId of a group
                env: "staging",
            });

            // actual api
            const chatHistory = await PushAPI.chat.history({
                threadhash: conversationHash.threadHash,
                account: `${accounts[0]}`,
                limit: limit,
                toDecrypt: true,
                pgpPrivateKey: pgpDecryptedPvtKey,
                env: "staging",
            });

            chatHistory.forEach((item) => {
                const from = item.fromCAIP10.slice(7);
                const timestamp = item.timestamp;
                const message = item.messageContent;

                const msgObj = {
                    from: `${from}`,
                    timestamp: `${timestamp}`,
                    message: `${message}`
                };

                Data.push(msgObj);
            });

            Data.reverse()

            setLoading(false);
            return { status: "Success", data: Data };
        } else {
            console.log("Ethereum object doesn't exist!");
            setLoading(false);
            return {
                status: "Error",
                data: {
                    err: null,
                    msg: "Some problem with Metamask! Please try again",
                },
            };
        }
    } catch (error) {
        console.log(error);
        setLoading(false);
        if (error.toString().includes("user rejected signing")) {
            return {
                status: "Error",
                data: {
                    err: error,
                    msg: "Please sign messages to load chat history!!",
                },
            };
        } else if (
            error.toString().includes("Request failed with status code 400")
        ) {
            return {
                status: "Error",
                data: { err: error, msg: "No Messages Found!" },
            };
        } else {
            return {
                status: "Error",
                data: { err: error, msg: "Unexpected error occurred!" },
            };
        }
    }
}
