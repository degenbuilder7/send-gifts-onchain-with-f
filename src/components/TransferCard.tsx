// @ts-nocheck
import { useState } from "react";
import { Box, Card, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useReadContract } from "wagmi";
import { TRANSFER_CONTRACT_ADDRESS } from "../../const/addresses";
import TokenSelection from "./TokenSelection";
import TokenBalance from "./TokenBalance";
import TransferButton from "./TransferButton";
import styles from "../styles/Home.module.css";

import contractABI from "../../abi/giftonfarcaster.json";

export default function TransferCard() {
    const [formData, setFormData] = useState({
        receiver: '',
        amount: '',
        message: '',
        claimcode: ''
    });
    const [selectedToken, setSelectedToken] = useState('');

    const handleChange = (event, name) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: event.target.value
        }));
    };

    const handleTokenSelection = (tokenAddress : string) => {
        setSelectedToken(tokenAddress);
    };

    const {
        data: verifiedTokens,
        isLoading: isVerifiedTokensLoading,
        status
    } = useReadContract({
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
        functionName: "getAllVerifiedTokens",
        // args: ["0x0000000000000000000000000000000000000000"],
    });


    return (
        <Card w={"50%"} p={20}>
            <Heading>Transfer:</Heading>

            <Text mt={4} fontWeight={"bold"}>Select Token:</Text>
            <Flex flexDirection={"row"} mt={4}>
                {!isVerifiedTokensLoading && verifiedTokens && 
                    verifiedTokens.map((token, index) => (
                        <Box
                            key={index}
                            onClick={() => handleTokenSelection(token)}
                            className={styles.tokenButton}
                        >
                            <TokenSelection
                                tokenAddress={token}
                                isSelected={selectedToken === token}
                            />
                        </Box>
                    ))}
            </Flex>

            <TokenBalance tokenAddress={selectedToken} />

            <Text mt={4} fontWeight={"bold"}>Send To:</Text>
            <Input
                placeholder="0x0000000"
                type="text"
                value={formData.receiver}
                onChange={(event) => handleChange(event, "receiver")}
            />
            <Text mt={4} fontWeight={"bold"}>Amount:</Text>
            <Input
                placeholder="0.0"
                type="number"
                value={formData.amount}
                onChange={(event) => handleChange(event, "amount")}
            />
            <Text mt={4} fontWeight={"bold"}>Message:</Text>
            <Input
                placeholder="Add a short message here."
                type="text"
                value={formData.message}
                onChange={(event) => handleChange(event, "message")}
            />

<Text mt={4} fontWeight={"bold"}>Claim Code:</Text>
            <Input
                placeholder="Add a unique code here."
                type="text"
                value={formData.claimcode}
                onChange={(event) => handleChange(event, "claimcode")}
            />
            <Box mt={8}>
                <TransferButton
                    tokenAddress={selectedToken}
                    receiver={formData.receiver}
                    amount={formData.amount.toString()}
                    message={formData.message}
                    claimcode={formData.claimcode}
                />
            </Box>
        </Card>
    );
};
