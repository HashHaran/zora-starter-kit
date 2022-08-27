import { useContractWrite } from "wagmi";
import * as mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/4.json"
import { abi } from "../../abi/FlexiBarterOffersV1.sol/FlexiBarterOffersV1.json"
import { useState } from "react";
import { ethers } from "ethers";

export const FillFlexiBarterOffer = (nft) => {

    interface fillOfferCall {
        tokenContract: any,
        tokenId: any,
        offerId: any,
        offerTokenContract: any,
        offerTokenId: any,
        currency: any, 
        amount: any,
        finder: any
    }
    
    const [fillOffer, setFillOffer] = useState<fillOfferCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
        "offerId": "",
        "offerTokenContract": "",
        "offerTokenId": "",
        "currency": "0x0000000000000000000000000000000000000000",
        "amount": "",
        "finder": "0x0000000000000000000000000000000000000000"
    })

    const offerTokenId = nft ? nft.nft.nft.tokenId : fillOffer.tokenId
    const offerContractAddress = nft ? nft.nft.nft.contractAddress : fillOffer.tokenContract

    // FlexiBarterOffersV1 fillOfferAmount call
    const offerPrice = fillOffer.amount ? ethers.utils.parseEther(fillOffer.amount) : ""

    const { data: fillOfferData, isError: fillOfferError, isLoading: fillOfferLoading, isSuccess: fillOfferSuccess, write: fillOfferWrite  } = useContractWrite({
        addressOrName: mainnetZoraAddresses.OffersV1,
        contractInterface: abi,
        functionName: 'fillOffer',
        args: [
            offerContractAddress,
            offerTokenId,
            fillOffer.offerId,
            fillOffer.offerTokenContract,
            fillOffer.offerTokenId,
            fillOffer.currency,
            offerPrice,
            fillOffer.finder
        ],
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(fillOfferData, variables, context) {
            console.log("Success!", fillOfferData)
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
                    name="fillOfferId"
                    type="number"
                    value={fillOffer.offerId}
                    onChange={(e) => {
                        e.preventDefault();
                        setFillOffer(current => {
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
                    name="fillOfferTokenContract"
                    type="text"
                    value={fillOffer.offerTokenContract}
                    onChange={(e) => {
                        e.preventDefault();
                        setFillOffer(current => {
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
                    name="fillOfferTokenId"
                    type="number"
                    value={fillOffer.offerTokenId}
                    onChange={(e) => {
                        e.preventDefault();
                        setFillOffer(current => {
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
                    name="fillOfferCurrency"
                    type="text"
                    value={fillOffer.currency}
                    onChange={(e) => {
                        e.preventDefault();
                        setFillOffer(current => {
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
                    name="fillOfferPrice"
                    type="number"
                    value={fillOffer.amount}
                    onChange={(e) => {
                        e.preventDefault();
                        setFillOffer(current => {
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

            <div className="flex flex-row w-full">
                <input
                    className="flex flex-row flex-wrap w-full text-black text-center bg-slate-200 hover:bg-slate-300"
                    placeholder="Finder (address)"
                    name="fillOfferFinder"
                    type="text"
                    value={fillOffer.finder}
                    onChange={(e) => {
                        e.preventDefault();
                        setFillOffer(current => {
                            return {
                            ...current,
                            finder: e.target.value
                            }
                        })
                    }}
                    required                              
                >
                </input>
            </div>                                 

            <button 
                type="button"
                onClick={() => fillOfferWrite()}
                className="border-2 border-white border-solid w-full px-2 hover:bg-[#33FF57] hover:text-slate-900"
            >
                FILL OFFER
            </button>
        </div>
    )
}