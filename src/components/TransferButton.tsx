import React from 'react';
import { useWriteContract } from 'wagmi';
import { useToast } from '@chakra-ui/react';
import contractABI from '../../abi/giftonfarcaster.json';
import { TRANSFER_CONTRACT_ADDRESS } from '../../const/addresses';

type Props = {
  tokenAddress: string;
  receiver: string;
  amount: string;
  message: string;
  claimcode: string;
};

export default function TransferButton({ tokenAddress, receiver, amount, message , claimcode}: Props) {
  const toast = useToast();

  const { 
    data: hash,
    error, 
    isPending, 
    writeContract 
  } = useWriteContract() 

  async function transfertokens() { 
    writeContract({
        address: TRANSFER_CONTRACT_ADDRESS,
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_charity",
                        "type": "address"
                    }
                ],
                "name": "addVerifiedCharity",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_token",
                        "type": "address"
                    }
                ],
                "name": "addVerifiedToken",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "donor",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "charityAddress",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "CharityDonationMade",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "claimCode",
                        "type": "string"
                    }
                ],
                "name": "claimGiftWithCode",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "giftId",
                        "type": "uint256"
                    }
                ],
                "name": "claimTimelockedGift",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "contract GiftonFarcasterInterface",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "message",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "claimCode",
                        "type": "string"
                    }
                ],
                "name": "createGiftWithClaimCode",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "contract GiftonFarcasterInterface",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "unlockTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "message",
                        "type": "string"
                    }
                ],
                "name": "createTimelockedGift",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "contract GiftonFarcasterInterface",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "charityAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "donateToCharity",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "claimant",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "GiftClaimed",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "processRecurringGifts",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_charity",
                        "type": "address"
                    }
                ],
                "name": "removeVerifiedCharity",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_token",
                        "type": "address"
                    }
                ],
                "name": "removeVerifiedToken",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "contract GiftonFarcasterInterface",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "interval",
                        "type": "uint256"
                    }
                ],
                "name": "setupRecurringGift",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "giftId",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "unlockTime",
                        "type": "uint256"
                    }
                ],
                "name": "TimelockGiftCreated",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "receiver",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "message",
                        "type": "string"
                    }
                ],
                "name": "TransactionCompleted",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "getAllVerifiedTokens",
                "outputs": [
                    {
                        "internalType": "address[]",
                        "name": "",
                        "type": "address[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "recurringGifts",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "tokenAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "interval",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "nextDueDate",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "verifiedCharities",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "verifiedTokenList",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        functionName: 'createGiftWithClaimCode',
        args: [tokenAddress, receiver, amount, message, claimcode]
    })
  } 


  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Transfer Failed',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else if (!error) {
      toast({
        title: 'Transfer Successful',
        description: 'You have successfully transferred tokens!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  return (
    <button
      onClick={() => transfertokens()}
      disabled={isPending}
    >
      {isPending ? 'Processing...' : 'Wrap your tokens into gift'}
    </button>
  );
}
