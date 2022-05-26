import React, { useEffect } from "react";
import { Popover } from "@headlessui/react";
import { ChevronDownIcon, LogoutIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import { useWallet } from 'use-wallet';
import Web3 from "web3";

import { injected } from "../utils/connectors"

import { Button } from "./Button";
import { shortenedPublicKey } from "../utils/utils";

export const WalletButton = () => {

  const wallet = useWallet();
  const { active, activate, deactivate } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
      localStorage.setItem('isWalletConnected', true)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
      localStorage.setItem('isWalletConnected', false)
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, [activate]);
  
  const balance = active ? Web3.utils.fromWei(wallet.balance, 'ether').slice(0, 6) : 0;

  // const [wallet, setWallet] = useState(false);
  // const [walletDetails, setWalletDetails] = useState({
  //   address: "",
  //   Balance: null,
  // });

  //  const getWeb3 = async () => {
  //     return new Promise(async (resolve, reject) => {
  //         const web3 = new Web3(window.ethereum)

  //         try {
  //             accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
  //             resolve(web3)
  //         } catch (error) {
  //             alert("install metamask extension!!");
  //             reject(error)
  //         }
  //     })
  // }

  //   // const connect = async () => {
  //   //     const web3 = await getWeb3();
  //   //     const walletAddress = await web3.eth.requestAccounts();
  //   //     const walletBalanceInWei = await web3.eth.getBalance(walletAddress[0]);
  //   //     const walletBalanceInEth = Math.round(web3.utils.fromWei(walletBalanceInWei) * 1000) / 1000;
  //   //     setWallet(true);
  //   //     setWalletDetails({
  //   //         address: walletAddress[0],
  //   //         Balance: walletBalanceInEth
  //   //     })
  //   // }

  //   // const disconnect = () => {
  //   //     setWallet(false);
  //   // }

  return active ? (
    <Popover className="relative">
      {(
        <>
          <Popover.Button as={Button}>
            <span className="flex flex-row items-center">
              {shortenedPublicKey(wallet.account)}
              <span className="ml-2 flex flex-row bg-indigo-900 p-1 rounded">
                <span className="ml-2">{ balance} ETH</span>
              </span>
              <ChevronDownIcon className="text-white ml-2 h-6" />
            </span>
          </Popover.Button>

          <Popover.Panel className="absolute z-10 flex flex-col rounded bg-white w-full">
            <span className="mt-4 px-2 uppercase text-gray-500 font-regular text-xs">
              Wallet Connected
            </span>

            <span className="mb-4 ml-2 flex flex-row rounded text-gray-500 text-sm items-center">
              <span className="ml-2">{ balance } ETH</span>
            </span>

            <button
              onClick={disconnect}
              className="flex flex-row p-2 justify-between text-gray-500 font-regular border-t"
            >
              Disconnect
              <LogoutIcon className="text-indigo-600 ml-2 h-5" />
            </button>
          </Popover.Panel>
        </>
      )}
    </Popover>
  ) : (
    <Button onClick={connect}>Connect Wallet</Button>
  );
};
