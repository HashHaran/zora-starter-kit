import { useContractWrite } from "wagmi";
import * as mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/4.json"
import { abi } from "../../abi/FlexiBarterOffersV1.sol/FlexiBarterOffersV1.json"
import { useState } from "react";
import { ethers } from "ethers";

export const UpdateFlexiBarterOffer = (nft) => {

    interface updateOfferCall {
        tokenContract: any,
        tokenId: any,
        offerId: any,
        offerTokenContract: any,
        offerTokenId: any,
        currency: any, 
        amount: any,
    }
    
    const [updateOffer, setupdateOffer] = useState<updateOfferCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
        "offerId": "",
        "offerTokenContract": "",
        "offerTokenId": "",
        "currency": "0x0000000000000000000000000000000000000000",
        "amount": ""
    })

    const offerTokenId = nft ? nft.nft.nft.tokenId : updateOffer.tokenId
    const offerContractAddress = nft ? nft.nft.nft.contractAddress : updateOffer.tokenContract

    // FlexiBarterOffersV1 updateOfferAmount call
    const offerPrice = updateOffer.amount ? ethers.utils.parseEther(updateOffer.amount) : ""

    const { data: updateOfferData, isError: updateOfferError, isLoading: updateOfferLoading, isSuccess: updateOfferSuccess, write: updateOfferWrite  } = useContractWrite({
        addressOrName: mainnetZoraAddresses.OffersV1,
        contractInterface: abi,
        functionName: 'updateOffer',
        args: [
            offerContractAddress,
            offerTokenId,
            updateOffer.offerId,
            updateOffer.offerTokenContract,
            updateOffer.offerTokenId,
            updateOffer.currency,
            offerPrice,
        ],
        overrides: {
            value: offerPrice
        },
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(updateOfferData, variables, context) {
            console.log("Success!", updateOfferData)
        },
    })

    const shortenedAddress = (address) => {
        let displayAddress = address?.substr(0,4) + "..." + address?.substr(-4)
        return displayAddress
    }
    
    return (
        <div className="flex flex-row flex-wrap w-fit space-y-1">
            <div className="flex flex-row flex-wrap w-full justify-center  border-solid ">
                <div>
                    {"Contract Address: " + shortenedAddress(nft.nft.nft.contractAddress)}
                </div>                    
                <div className="ml-5 flex flex-row flex-wrap w-fit">                    
                    {"Token Id: " + nft.nft.nft.tokenId}
                </div>                                       
            </div>              

            <div className="flex flex-row w-full">                      
                <input
                    className="flex flex-row flex-wrap w-full text-black text-center bg-slate-200 hover:bg-slate-300"
                    placeholder="Offer Id"
                    name="updateOfferId"
                    type="number"
                    value={updateOffer.offerId}
                    onChange={(e) => {
                        e.preventDefault();
                        setupdateOffer(current => {
                            return {
                            ...current,
                            offerId: e.target.value
                            }
                        })
                    }}
                    required                              
                >
                </input>     
            </div>       
            
            <div className="flex flex-row w-full">                
                <input
                    className="flex flex-row flex-wrap w-full text-black text-center bg-slate-200 hover:bg-slate-300"
                    placeholder="Offer Token Contract"
                    name="updateOfferTokenContract"
                    type="text"
                    value={updateOffer.offerTokenContract}
                    onChange={(e) => {
                        e.preventDefault();
                        setupdateOffer(current => {
                            return {
                            ...current,
                            offerTokenContract: e.target.value
                            }
                        })
                    }}
                    required                              
                >
                </input>
            </div>

            <div className="flex flex-row w-full">                      
                <input
                    className="flex flex-row flex-wrap w-full text-black text-center bg-slate-200 hover:bg-slate-300"
                    placeholder="Offer Token Id"
                    name="updateOfferTokenId"
                    type="number"
                    value={updateOffer.offerTokenId}
                    onChange={(e) => {
                        e.preventDefault();
                        setupdateOffer(current => {
                            return {
                            ...current,
                            offerTokenId: e.target.value
                            }
                        })
                    }}
                    required                              
                >
                </input>     
            </div>
            
            <div className="flex flex-row w-full">                
                <input
                    className="flex flex-row flex-wrap w-full text-black text-center bg-slate-200 hover:bg-slate-300"
                    placeholder="Offer Currency"
                    name="updateOfferCurrency"
                    type="text"
                    value={updateOffer.currency}
                    onChange={(e) => {
                        e.preventDefault();
                        setupdateOffer(current => {
                            return {
                            ...current,
                            currency: e.target.value
                            }
                        })
                    }}
                    required                              
                >
                </input>
            </div>

            <div className="flex flex-row w-full">
                <input
                    className="flex flex-row flex-wrap w-full text-black text-center bg-slate-200 hover:bg-slate-300"
                    placeholder="Offer Price (ETH)"
                    name="createOfferPrice"
                    type="number"
                    value={updateOffer.amount}
                    onChange={(e) => {
                        e.preventDefault();
                        setupdateOffer(current => {
                            return {
                            ...current,
                            amount: e.target.value
                            }
                        })
                    }}
                    required                              
                >
                </input>
            </div>            

            <button 
                type="button"
                onClick={() => updateOfferWrite()}
                className="border-2 border-white border-solid w-full px-2 hover:bg-[#33FF57] hover:text-slate-900"
            >
                UPDATE OFFER
            </button>
        </div>
    )
}