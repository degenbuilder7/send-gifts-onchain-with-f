import {
    getContractForErc721OpenEdition,
    getErc721PreparedEncodedData,
    getFarcasterAccountAddress,
  } from "../../../../utils/tx-frame";
  import { CoinbaseKit } from "../../../../../classes/CoinbaseKit";
  import { abi } from "./abi";
  import { FrameRequest } from "@coinbase/onchainkit";
  import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
  
  const contractAddress = "0x5a29EE8842E857fA19ed5C19E33b30a1cDa22B11"; // base sepolia contract address
  
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    // Return error response if method is not POST
    if (req.method !== "POST") {
      console.log(":errr")
    }
  
    console.log("validating message",req.body);
    // Validate message with @coinbase/onchainkit
    // const { isValid, message } = await CoinbaseKit.validateMessage(
    //   req.body as FrameRequest,
    // );
  
    // console.log("validating message",isValid,message);
    // // Validate if message is valid
    // if (!isValid || !message) {
    //   console.log("Invalid message", 400);
    // }
  // @ts-ignore
    // Get the first verified account address or custody address
    const accountAddress = req.body.untrustedData.address;

    console.log(accountAddress,"accoutadd of user")
  
    // Get the contract instnace

    
    // Get encoded data
  
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
  }

  // Assuming the body contains the claimCode
  const { inputText } = req.body.untrustedData;
  if (!inputText) {
      return res.status(400).json({ error: "Claim code is required" });
  }

  // Use ethers.js to get encoded data
  const iface = new ethers.utils.Interface(abi);
  const data = iface.encodeFunctionData("claimGiftWithCode", [inputText]);

    console.log(data,"contract and data")
    // Return transaction details response to farcaster
    return res.status(200).json({
      chainId: "eip155:84532",
      method: "eth_sendTransaction",
      params: {
        abi,
        to: contractAddress,
        data,
        value: "0",
      },
    });
  }