import { useContractRead } from "wagmi";
import * as mainnetZoraAddresses from "../../addresses/4.json"
import { abi } from "../../abi/FlexiBarterOffersV1.sol/FlexiBarterOffersV1.json"
import { useState, useEffect } from "react";
import { BigNumber, utils } from "ethers";

export const GetExistingFlexiBarterOffers = (nft) => {

    const [offerId, setOfferId] = useState("0")

    // OffersV1 offerForNFT read call
    const { data, isLoading, isSuccess, isFetching } = useContractRead({
        //TODO: Change to Flexi Barter Offers Deployed address
        addressOrName: mainnetZoraAddresses.FlexiBarterOffersV1,
        contractInterface: abi,
        functionName: 'offersForNFT',
        args: [
            nft.nft.nft.contractAddress,
            nft.nft.nft.tokenId,
            1 //hardcoded always looking for first offer
        ],
        watch: true,
        onError(error) {
            console.log("error: ", error)
        },
        onSuccess(data) {
            console.log("success! --> ", data)
            console.log("data converted", BigNumber.from(data).toString())
            setOfferId(BigNumber.from(data).toString())
        }
    })

    // OffersV1 offers read call
    const { data: offersData, isLoading: offersLoading, isSuccess: offersSuccess, isFetching: offersFetching } = useContractRead({
        //TODO: Change to Flexi Barter Offers Deployed address
        addressOrName: mainnetZoraAddresses.FlexiBarterOffersV1,
        contractInterface: abi,
        functionName: 'offers',
        args: [
            nft.nft.nft.contractAddress,
            nft.nft.nft.tokenId,
            offerId
        ],
        watch: true,
        onError(error) {
            console.log("error: ", error)
        },
        onSuccess(data) {
            console.log("success! --> ", offersData)
            console.log("specific offer info", offersData)
        }
    })

    const offerMaker = offersData ? offersData.maker : "0x0000000000000000000000000000000000000000"
    const currentReadData = offersData ? offersData : ""
    const currentReadPrice = offersData ? `${utils.formatEther(BigNumber.from(currentReadData[3]).toString())}` + " ETH" : "undefined"
    const offeredNftTokenId = offersData ? BigNumber.from(currentReadData[5]).toString(): "undefined"

    const offersCheck = () => {
        if (offerMaker === "0x0000000000000000000000000000000000000000") {
            return (
                <div>
                    No Active Listing for current Address + token id
                </div>
            )
        } else {
            return (
                <div className="flex flex-row flex-wrap w-fit space-y-1">
                    <div className="flex flex-row flex-wrap w-full">
                        {"Contract Address: " + nft.nft.nft.contractAddress}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">
                        {"Token Id: " + nft.nft.nft.tokenId}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">
                        {"Currency: " + offersData[1]}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">
                        {"Finders Fee Bps: " + offersData[2]}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">
                        {"Price: " + currentReadPrice}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">
                        {"Offer NFT Contract Address: " + offersData[4]}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">
                        {"Offer NFT Token Id: " + offeredNftTokenId}
                    </div>
                    <div className="flex flex-row flex-wrap w-full">
                        {"Offer Id: " + offerId}
                    </div>
                </div>
            )
        }
    }

    return (
        <div className=" text-white text-sm h-full flex flex-col flex-wrap items-center justify-center">
            <main className=" w-full flex flex-row flex-wrap">
                {offersCheck()}
            </main>
        </div>
    )
}