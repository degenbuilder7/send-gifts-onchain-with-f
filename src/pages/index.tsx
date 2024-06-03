"use client";
import React, { useEffect } from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { Box, Button, Container, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import FeatureCard from "../components/FeatureCard";
import Link from "next/link";
import Image from "next/image";

const title = "Transaction Farcaster Frame on Base";
const description ="Onchain Gifts";

  const getAbsoluteUrl = "https://giftonfarcaster.vercel.app/tx-frame-og-image.png";
  
const BaseFramePage = () => {

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          images: [
            {
              url: getAbsoluteUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
      />
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://github.com/aarav1656/giftonfarcaster/blob/main/public/warpcast.png" />
        <meta name="og:image" content={getAbsoluteUrl} />
        <meta name="fc:frame:input:text" content="Enter your code" />
        <meta property="fc:frame:button:1" content="Redeem your Gift" />
        <meta property="fc:frame:button:1:action" content="tx" />
        <meta
          property="fc:frame:button:1:target"
          content="https://giftonfarcaster.vercel.app/api/frame/base/get-tx-frame"
        />
      </Head>
      <body>
      <Container maxW={"1440px"}>
      <Flex h={"75vh"} px={20} borderRadius={20} >
        <Flex flexDirection={"row"}>
          <Flex flexDirection={"column"} justifyContent={"center"} w={"60%"}>
            <Stack spacing={4}>
              <Heading fontSize={"xl"}>GiftonFarcaster</Heading>
              <Heading fontSize={"6xl"}>
                Gift 🎁 tokens to your friends and family on Farcaster.
              </Heading>
              <Text fontSize={"xl"}>
                Select from a selection of tokens to transfer to your friends and family. Write a message to go along with your token transfer.
              </Text>
              <Link href={"/transfer"}>
                <Button w={"80%"}>Create a Gift</Button>
              </Link>
            </Stack>
          </Flex>
          <Box flexShrink={0} ml={{ base: 0, md: 6 }} mt={{ base: 40, md: 40 }}>
            <Image src="/warpcast.png" alt="feature" height={320} width={320} />
          </Box>
        </Flex>
      </Flex>
      <SimpleGrid columns={2} spacing={4} mt={4}>
        <Flex>
            <Image src="/redeem.png" alt="feature" height={250} width={450} />
        </Flex>
        <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
          <Stack spacing={4}>
            <FeatureCard
              step={"01"}
              title={"Select a Token"}
              description={"Select from a list of verified tokens from the drop down to send to your friends and family."}
            />
            <FeatureCard
              step={"02"}
              title={"Who to Send To"}
              description={"Enter the wallet address of the person you want to send the token to. This is non-reversible so make sure you have the right address."}
            />
            <FeatureCard
              step={"03"}
              title={"Write a Message"}
              description={"Write a message to go along with your token transfer. This is optional but it's always nice to send a message to your friends and family."}
            />
          </Stack>
        </Flex>
      </SimpleGrid>
    </Container>
      </body>
    </>
  );
};

export default BaseFramePage;