// context/WalletContext.js

import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from '../abi/NFTFashionPlatformCore.json';
import kabi from '../abi/NFTFashionPlatformCollaboration.json'
import babi from '../abi/NFTBattle.json'

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    address: null,
    core: null,
    collab:null,
    battle:null
  });

  const connectWallet = async () => {
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });
    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    });

    const contractAddress = '0x3799f85BBDddB9a5a1e19c142eC9b94Ea6E27c89';
    const contractABI = abi.abi;
    const kcontractAddress = '0x534A767df6b956E6F30640D58217e708194d8F70'
    const kcontractABI = kabi.abi;
    const bcontractAddress = '0x93b077f51C2415EF518e544f2F2724C495521d72'
    const bcontractABI = babi.abi;

    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log('Metamask is not installed');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      if (accounts.length === 0) {
        console.log('No account found');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const core = new ethers.Contract(contractAddress, contractABI, signer);
      const collab = new ethers.Contract(kcontractAddress,kcontractABI,signer)
      const battle = new ethers.Contract(bcontractAddress,bcontractABI,signer)
      setAccount(address);

      setState({ provider, signer, address, core,collab,battle });
    } catch (error) {
      console.error('Error connecting to Metamask:', error);
    }
  };

  return (
    <WalletContext.Provider value={{ state, account, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
