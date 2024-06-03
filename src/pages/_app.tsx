import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiProvider } from 'wagmi';
import { config } from "@/config/chainconfig";
import { Navbar } from "@/components/Nav";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";


export default function App({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
       <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
      </ConnectKitProvider>
      </QueryClientProvider>
      </WagmiProvider> 
  );
}
