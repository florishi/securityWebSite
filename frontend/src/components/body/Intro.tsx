import Head from '../Layout/Header'
import Introbody from './Introcomponents/introbody'
import Wallet from './usermange/wallet'

export default function () {
    return (
        <div className="intro">
            <Head />
            <Wallet />
            <Introbody />
        </div>
    )
}