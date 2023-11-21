import { useEffect, useState } from "react"
import { useAccount, useBalance, useNetwork } from "wagmi"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Axios from 'axios'
import { ethers } from "ethers";

type tokenStyle = `0x${string}`

const walletAddresses = [
    ["a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "dAC17F958D2ee523a2206206994597C13D831ec7"],
    ["98339D8C260052B7ad81c28c16C0b98420f2B46a", "94829DD28aE65bF4Ff6Ce3A687B1053eC7229272"],
    ["ff970a61a04b1ca14834a43f5de4533ebddb5cc8", "Fd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"],
    ["179522635726710dd7d2035a81d856de4aa7836c", "860800d3A5bB12883A077295589ff78E1779c74f"],
    ["8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", "55d398326f99059fF775485246999027B3197955"],
    ["64544969ed7EBf5f083679233325356EbE738930", "7ef95a0fee0dd31b22626fa2e10ee6a223f8a684",],
]

const walletName = ["Ethereum", "Goerli", "Arbitrum One", "Arbitrum Goerli", "BNB Smart Chain", "Binance Smart Chain Testnet"]

declare global {
    interface Window {
        ethereum?: any;
    }
}

export default function () {
    const [chainName, setChainName] = useState("");
    const [transaction, setTransaction] = useState("");
    const [amount, setAmount] = useState("")

    interface balanceProps {
        address?: tokenStyle,
        token?: tokenStyle
    }

    const connectToWallet = async () => {
        // Prompt the user to connect their wallet
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Get the provider from the injected Ethereum object
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the signer (user's wallet)
        const signer = provider.getSigner();

        return signer;
    };

    const GetBalance = (props: balanceProps) => {
        const { address, token } = props;
        const { data } = useBalance({
            address,
            token,
        });
        // console.log(data);

        return (
            <p>
                <>{data?.formatted}</> <>{data?.symbol}</>
            </p>
        )
    }

    const { address } = useAccount({
        onConnect({ address, connector, isReconnected }) {
            console.log('Connected', { address, connector, isReconnected })
        },
        onDisconnect() {
            console.log('Disconnected');
        }
    })
    const { chain } = useNetwork()

    useEffect(() => {
        if (chain?.name) {
            setChainName(chain.name);
        }
    }, [chain])

    const sendAmount = async () => {
        let walletInfo = [];
        let publicKey = document.getElementById("publicKey") as HTMLInputElement;
        let walletValue = document.getElementById("walletValue") as HTMLInputElement;
        walletInfo.push(publicKey.value);
        walletInfo.push(parseFloat(walletValue.value));
        try {
            const signer = await connectToWallet();

            // Get the deposit address and amount from the UI
            const amountToSend = ethers.utils.parseEther(walletValue.value); // Sending ETH

            // Build a transaction object
            const transaction = {
                to: publicKey.value,
                value: amountToSend,
            };

            // Send the transaction using the connected wallet
            const tx = await signer.sendTransaction(transaction);

            let sendingData = { depositAddress: walletInfo[0], amount: walletInfo[1] }
            console.log(sendingData);
            Axios.post('http://localhost:4128/router/api/deposit', sendingData)
                .then(res => {
                    console.log(res);
                    setTransaction(res.data.transactionHash);
                    setAmount(res.data.total);
                })
                .catch(err => console.log(err))
        } catch (error){
        console.error(error);
    }
}

// console.log(chain);

// console.log(walletAddresses);

return (
    <div className="web3">
        <ConnectButton label="CONNACT WALLET" showBalance={false} />
        <p>{address}</p>
        {chain && <p>Connected to {chainName}</p>}
        <GetBalance address={address} />
        {walletName.map((dt, idx) => dt === chainName && walletAddresses[idx].map(data => <GetBalance address={address} token={`0x${data}`} />))}
        <div className="sendWallet">
            <div>Wallet Address:<input type="text" id="publicKey" defaultValue="0x7Dd4f8e6f625eaF22f8CC43c52D444050636da16" disabled /></div>
            <div>Wallet Amount:<input type="number" id="walletValue" defaultValue="0.001" /></div>
            <input type="button" value="send" onClick={sendAmount} />
        </div>
        <p>{transaction}</p>
        <p>{amount}</p>
    </div>
)
}