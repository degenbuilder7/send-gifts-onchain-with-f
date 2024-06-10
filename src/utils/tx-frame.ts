import { FrameValidationData } from "@coinbase/onchainkit";
import { SmartContract  } from "@thirdweb-dev/sdk";
import { BaseContract, Wallet } from "ethers";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { Signer } from "ethers";
import { type SDKOptions } from "@thirdweb-dev/sdk";

export const getContractForErc721OpenEdition = async (
  contractAddress: string,
) => {

  function getThirdwebSDK(
    chainId: number,
    rpcUrl: string,
    sdkOptions?: SDKOptions,
    signer?: Signer,
  ): ThirdwebSDK {
    try {
      new URL(rpcUrl);
    } catch (e) {
      console.error("Invalid rpcUrl", e, rpcUrl);
      // overwrite the rpcUrl with a valid one!

        rpcUrl = `https://${chainId}.rpc.thirdweb.com/${process.env.NEXT_PUBLIC_APP_DASHBOARD_THIRDWEB_CLIENT_ID}`;
    }
  
    const readonlySettings =
      chainId && rpcUrl
        ? {
            chainId,
            rpcUrl,
          }
        : undefined;
  
    // PERF ISSUE - if the sdkOptions is a huge object, stringify will be slow
    const sdkKey = chainId + rpcUrl + (sdkOptions ? JSON.stringify(sdkOptions) : "");
  
    let sdk: ThirdwebSDK | null = null;
  
    if (EVM_SDK_MAP.has(sdkKey)) {
      sdk = EVM_SDK_MAP.get(sdkKey) as ThirdwebSDK;
    } else {
      sdk = new ThirdwebSDK(
        rpcUrl,
        {
          ...sdkOptions,
          readonlySettings,
          clientId: process.env.NEXT_PUBLIC_APP_DASHBOARD_THIRDWEB_CLIENT_ID,
          secretKey: process.env.NEXT_PUBLIC_APP_DASHBOARD_THIRDWEB_SECRET_KEY,
        },
      );
  
      EVM_SDK_MAP.set(sdkKey, sdk);
    }
  
    if (signer) {
      sdk.updateSignerOrProvider(signer);
    }
  
    return sdk;
  }

  const EVM_SDK_MAP = new Map<string, ThirdwebSDK>();
  // Create a reandom signer. This is required to encode erc721 tx data
  const signer = Wallet.createRandom();

  const sdk = getThirdwebSDK(
    84532,
    "https://sepolia.base.org",
    undefined,
    signer,
  );


  sdk.updateSignerOrProvider(signer);

  // Get contract instance
  const contract = await sdk.getContract(contractAddress);

  // Return contract instance
  return contract;
};

export const getErc721PreparedEncodedData = async (
  walletAddress: string,
  contract: SmartContract<BaseContract>,
) => {
  // Prepare erc721 transaction data. Takes in destination address and quantity as parameters
  const transaction = await contract.erc721.claimTo.prepare(walletAddress, 1);

  // Encode transaction data
  const encodedTransactionData = await transaction.encode();

  // Return encoded transaction data
  return encodedTransactionData;
};

export const getFarcasterAccountAddress = (
  interactor: FrameValidationData["interactor"],
) => {
  // Get the first verified account or custody account if first verified account doesn't exist
  return interactor.verified_accounts[0] ?? interactor.custody_address;
};