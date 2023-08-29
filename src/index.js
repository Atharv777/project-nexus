import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';


const { chains, publicClient } = configureChains(
    [polygonMumbai],
    [
        publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
    appName: 'Project Nexus',
    projectId: '263edeaacdd05f6d72b0cea18f0f2b7b',
    chains
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                <App />
            </RainbowKitProvider>
        </WagmiConfig>
    </React.StrictMode>
);
reportWebVitals();
