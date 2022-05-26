import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";


import NFTCard from './NFTCard';
import NFTInfo from './NFTInfo';

const Home = () => {

  const [nftList, setNftList] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const nfts = await axios.get('http://localhost:3001/nftmint');
      setNftList(nfts.data);
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Our NFTs</h2>
              <p className="text-xl text-gray-500">
                These are the NFTs minted on the Rinkeby testnet.
              </p>
            </div>
            <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
              {nftList.map((nft) => (
                <Link to={`/nft/${nft.tokenId}`} element={<NFTInfo />} key={nft.tokenId} >
                  <NFTCard nft={nft}  />
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home