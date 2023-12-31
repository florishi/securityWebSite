import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme, lightTheme, Locale } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  arbitrumGoerli,
  bscTestnet,
  bsc,
  goerli,
  mainnet,
  // optimism,
  // polygon,
  // base,
  // zora,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    arbitrum,
    arbitrumGoerli,
    bsc,
    bscTestnet,
    goerli,
    // polygon,
    // optimism,
    // arbitrum,
    // base,
    // zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);


const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: '676a5b8fbf0141f7901dc234f623b9fb',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        modalSize="compact"
        theme={lightTheme()}
        // showRecentTransactions={false}
        chains={chains} >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
