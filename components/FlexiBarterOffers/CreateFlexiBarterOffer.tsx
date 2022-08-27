import { useContractWrite } from "wagmi";
import * as mainnetZoraAddresses from "../../addresses/4.json"
import { abi } from "../../abi/FlexiBarterOffersV1.sol/FlexiBarterOffersV1.json"
import { useState } from "react";
import { ethers } from "ethers";

export const CreateFlexiBarterOffer = (nft) => {

    interface createFlexiBarterOfferCall {
        tokenContract: any,
        tokenId: any,
        currency: any, 
        amount: any,
        offerTokenContract: any,
        offerTokenId: any,
        findersFeeBps: any
    }
    
    const [createOffer, setCreateOffer] = useState<createFlexiBarterOfferCall>({
        "tokenContract": nft.nft.nft.contractAddress,
        "tokenId": nft.nft.nft.tokenId,
        "currency": "0x0000000000000000000000000000000000000000",
        "amount": "",
        "offerTokenContract": "",
        "offerTokenId": "",
        "findersFeeBps": ""
    })

    const offerTokenId = nft ? nft.nft.nft.tokenId : createOffer.tokenId
    const offerContractAddress = nft ? nft.nft.nft.contractAddress : createOffer.tokenContract

    // FlexiBarterOffersV1OffersV1 createOffer call
    const offerPrice = createOffer.amount ? ethers.utils.parseEther(createOffer.amount) : ""

    const { data: createOfferData, isError: createOfferError, isLoading: createOfferLoading, isSuccess: createOfferSuccess, write: createOfferWrite  } = useContractWrite({
        addressOrName: mainnetZoraAddresses.FlexiBarterOffersV1,
        contractInterface: abi,
        functionName: 'createOffer',
        args: [
            offerContractAddress,
            offerTokenId,
            createOffer.offerTokenContract,
            createOffer.offerTokenId,
            createOffer.currency,
            offerPrice,
            createOffer.findersFeeBps
        ],
        overrides: {
            value: offerPrice
        },
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(createOfferData, variables, context) {
            console.log("Success!", createOfferData)
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
                    placeholder="Offer Contract Address"
                    name="createOfferContracrAddress"
                    type="text"
                    value={createOffer.offerTokenContract}
                    onChange={(e) => {
                        e.preventDefault();
                        setCreateOffer(current => {
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
                    name="createOfferTokenId"
                    type="number"
                    value={createOffer.offerTokenId}
                    onChange={(e) => {
                        e.preventDefault();
                        setCreateOffer(current => {
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
                    placeholder="Offer Price (ETH)"
                    name="createOfferPrice"
                    type="number"
                    value={createOffer.amount}
                    onChange={(e) => {
                        e.preventDefault();
                        setCreateOffer(current => {
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
                    placeholder="Offer Currency"
                    name="createOfferCurrency"
                    type="text"
                    value={createOffer.currency}
                    onChange={(e) => {
                        e.preventDefault();
                        setCreateOffer(current => {
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
                    placeholder="Finders Fee Bps"
                    name="createOfferFindersFeeBps"
                    type="number"
                    value={createOffer.findersFeeBps}
                    onChange={(e) => {
                        e.preventDefault();
                        setCreateOffer(current => {
                            return {
                            ...current,
                            findersFeeBps: e.target.value
                            }
                        })
                    }}
                    required                              
                >
                </input>     
            </div>               
            <button 
                type="button"
                onClick={() => createOfferWrite()}
                className="border-2 border-white border-solid w-full px-2 hover:bg-[#33FF57] hover:text-slate-900"
            >
                CREATE OFFER
            </button>
        </div>
    )
}