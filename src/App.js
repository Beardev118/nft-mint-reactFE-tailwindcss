import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UseWalletProvider } from 'use-wallet';
import { Connectors } from 'web3-react';

import Create from './components/Create';
import Navbar from './components/Navbar';
import NFTInfo from './components/NFTInfo';
import Home from './components/Home';

const { InjectedConnector } = Connectors;
const MetaMask = new InjectedConnector({ supportedNetworks: [4] });
const connectors = { MetaMask };

function App() {
  return (
    <>
      <UseWalletProvider autoConnect connectors={connectors}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='nft' element={<Home />} />
          </Route>
          <Route path='/nft/:tokenId' element={<NFTInfo />} />
          <Route path='/create' element={<Create />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </UseWalletProvider>
    </>
  );
}

export default App;
