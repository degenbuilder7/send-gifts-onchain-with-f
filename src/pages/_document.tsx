import { Html, Head, Main, NextScript } from "next/document";

// Farcaster frames built with meta tags in the head
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:title" content={`GiftsOnchain`} />
        <meta property="og:image" content="https://giftonfarcaster.vercel.app/warpcast.png" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://giftonfarcaster.vercel.app/warpcast.png" />
        <meta property="fc:frame:post_url" content={`./api/mint`} />
        <meta property="fc:frame:button:1" content="Get started" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
