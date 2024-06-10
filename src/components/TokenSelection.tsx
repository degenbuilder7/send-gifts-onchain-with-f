import { Box, Card, Spinner, Text } from "@chakra-ui/react";
import {  useReadContract } from "wagmi";
import contractABI from "../../abi/token.json"; // Ensure the ABI has the symbol function

type Props = {
  tokenAddress: string;
  isSelected?: boolean;
};

export default function TokenSelection({ tokenAddress, isSelected }: Props) {
  const {
    data: tokenMetadata,
    isLoading: isTokenMetadataLoading,
  } = useReadContract({
    address: `0x${tokenAddress}`,
    abi: contractABI,
    functionName: "symbol",
  });

  let coinBorderColor = "gray.100";

  if (isSelected) {
    coinBorderColor = "green.100";
  }

  return (
    <Card p={4} mr={2} border={"2px solid"} borderColor={coinBorderColor}>
      {!isTokenMetadataLoading && tokenMetadata ? (
        <Box>
            {/* @ts-ignore */}
          <Text>{tokenMetadata}</Text> {/* Assuming `symbol` returns a string */}
        </Box>
      ) : (
        <Spinner />
      )}
    </Card>
  );
};
