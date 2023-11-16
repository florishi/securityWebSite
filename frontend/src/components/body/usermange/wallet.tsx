import { useEffect, useState } from "react"
import { getBalance } from "viem/_types/actions/public/getBalance";
import { useAccount, useBalance, useNetwork } from "wagmi"

export default function () {

    interface balanceProps {
        address?: `0x${string}`,
        token?: `0x${string}`
    }

    const GetBalance = (props: balanceProps) => {
        const { address, token } = props;
        const { data } = useBalance({
            address,
            token,
        });

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
    const { chain, chains } = useNetwork()
    console.log(chain?.id)
    return (
        <div className="web3">
            <p>{address}</p>
            {chain && <p>Connected to {chain.name}</p>}
            <GetBalance address={address} token={"0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"} />
            <GetBalance address={address} token={"0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"} />
            <GetBalance address={address} />
            <div>
                Wallet Address:<input type="text"/>
                Wallet Amount:<input type="number" />
            </div>
        </div>
    )
}