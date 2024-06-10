import { Box, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { getBalance } from '@wagmi/core'
import { config } from '../config/chainconfig';


type Props = {
    tokenAddress: string;
};

export default function TokenBalance({ tokenAddress }: Props) {
    const { address} = useAccount();

    
    return (
        <Box mt={4}>
            
                <Text>Balance</Text>

        </Box>
    )
}