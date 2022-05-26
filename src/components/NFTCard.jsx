import React from 'react'
import { shortenedPublicKey } from "../utils/utils";

const NFTCard = (props) => {
  return (
    <>
      <li key={props.nft.tokenId}>
        <div className="space-y-4">
          <div className="aspect-w-3 aspect-h-2">
            <img className="object-cover shadow-lg rounded-lg" src={props.nft.metadata.image} alt="" />
          </div>

          <div className="space-y-2">
            <div className="text-lg leading-6 font-medium space-y-1">
              <h3>{props.nft.metadata.name}</h3>
              <p className="text-indigo-600">{ shortenedPublicKey(props.nft.owner) }</p>
            </div>
            {/* <ul role="list" className="flex space-x-5">
              <li>
                
              </li>
              <li>
                
              </li>
            </ul> */}
          </div>
        </div>
      </li>
    </>
  )
}

export default NFTCard