import * as React from 'react'
import { useAccount, useBalance, useNetwork } from "wagmi"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Axios from 'axios'
import { ethers } from 'ethers'
import { Link } from 'react-router-dom'
import { Box, Button, FormLabel, TextField } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material'
import * as Tokens from '../constants'
import { FormControlLabel, FormControl, Radio, RadioGroup, OutlinedInput, InputLabel, InputAdornment } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { jwtDecode } from 'jwt-decode'
import { StyledComponent } from '@mui/styled-engine-sc'

type tokenStyle = `0x${string}`

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
    },
});

declare global {
    interface Window {
        etherum?: any;
    }
}

export default function () {
    const { address, status } = useAccount();
    const { chain } = useNetwork();

    const [chainName, setChainName] = React.useState("");
    const [userEmail, setUserEmail] = React.useState("");
    const [value, setValue] = React.useState('deposit');
    const [walletName, setWalletName] = React.useState("");
    const [amount, setAmount] = React.useState("0");
    const [depositAddress, setDepositAddress] = React.useState("");
    const [id, setId] = React.useState("");

    interface balanceProps {
        address?: tokenStyle,
        token?: tokenStyle
    }

    const GetBalance = (props: balanceProps) => {
        const { address, token } = props;
        const { data } = useBalance({
            address,
            token
        })
        return (
            <Box sx={{ my: 2 }}>
                <p>
                    {data?.formatted} {data?.symbol}
                </p>
            </Box>
        )
    }

    React.useEffect(() => {
        if (chain?.name) {
            setChainName(chain.name);
        }
    }, [chain])

    React.useEffect(() => {
        if (chain?.name) {
            setChainName(chain.name)
        }
    }, [chain])

    React.useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            const user = Object(jwtDecode(String(currentUser)));
            setId(user.id);
            setDepositAddress(user.address);
            setUserEmail(user.email);
        }
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const connectToWallet = async () => {
        // Prompt the user to connect their wallet
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Get the provider from the injected Ethereum object
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the signer (user's wallet)
        const signer = provider.getSigner();

        return signer;
    };

    const depositConnect = async (startWalletAddress: tokenStyle, toWalletAddress: tokenStyle) => {
        const signer = await connectToWallet();

        // Get the deposit address and amount from the UI
        const amountToSend = ethers.utils.parseEther(amount); // Sending ETH

        // Build a transaction object
        const transaction = {
            from: startWalletAddress,
            to: toWalletAddress,
            value: amountToSend,
        };

        // Send the transaction using the connected wallet
        const tx = await signer.sendTransaction(transaction);
    }

    const mainConnect = async (emailAddress: string, finalAddress: tokenStyle, fromAddress: tokenStyle | String) => {
        let email = "";
        if (emailAddress) { email = emailAddress }
        let sendingData = { depositAddress: walletName, amount: amount, value: value, currentEmail: email, finalAddress, id, fromAddress }
        Axios.post('http://localhost:4128/router/api/deposit', sendingData)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err))
    }

    const sendAmount = async () => {
        try {
            switch (value) {
                case "deposit":
                    depositConnect(
                        '0xcd5AB02Cc5390486BFe96b6Bd52d247E27DA17F3',
                        '0x7Dd4f8e6f625eaF22f8CC43c52D444050636da16');
                    mainConnect("",
                        "0xc8C109C99d76ee5a68574062Ed9000ABb9993156",
                        "0xcd5AB02Cc5390486BFe96b6Bd52d247E27DA17F3");
                    break;

                case "external":
                    mainConnect("",
                        "0xc8C109C99d76ee5a68574062Ed9000ABb9993156",
                        "");
                    break;

                case "platform":
                    mainConnect(userEmail, "0x", "");
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box className='deposit' sx={{ mx: 2, }}>
                <Box sx={{ my: 2 }}>
                    <Link to="/"><Button variant='outlined' sx={{ mb: 2 }}>Home</Button></Link>
                    <ConnectButton label='Connect Wallet' showBalance={true} />
                </Box>

                {chain && <p>{status} to {chainName}</p>}
                <p>Your wallet address: {address}</p>
                <GetBalance address={address} />
                <GetBalance address={address} token={(
                    chainName
                        ? Tokens[chainName as keyof typeof Tokens]?.usdt
                        : undefined) as `0x${string}` | undefined} />
                <GetBalance address={address} token={(chainName
                    ? Tokens[chainName as keyof typeof Tokens]?.usdc
                    : undefined) as `0x${string}` | undefined} />
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group" sx={{ fontSize: "24px", color: "white", mb: 3 }}>Check One</FormLabel>
                    <RadioGroup
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="deposit" control={<Radio sx={{ color: 'white' }} />} label="Deposit" />
                        <FormControlLabel value="external" control={<Radio sx={{ color: 'white' }} />} label="External Wallet" />
                        <FormControlLabel value="platform" control={<Radio sx={{ color: 'white' }} />} label="platform user" />
                    </RadioGroup>
                </FormControl>

                <Box sx={{ display: "flex", my: 2 }}>
                    <input type="text" id='walletName' name='walletName' style={{ width: "50vw" }} onChange={(e) => setWalletName(e.target.value)} />
                    <input type="Number" id='amount' name='amount' style={{ width: "30vw" }} onChange={(e) => setAmount(e.target.value)} />
                    <Button variant="contained" endIcon={<SendIcon />} onClick={sendAmount}>
                        Send
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    )
}