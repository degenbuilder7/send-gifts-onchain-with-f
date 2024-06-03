import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit";

export class CoinbaseKit {
  public static validateMessage = async (body: FrameRequest) => {

    console.log("validation start");
    const { isValid, message } = await getFrameMessage(body, {
      neynarApiKey: "NEYNAR_ONCHAIN_KIT",
    });

    console.log(isValid, message);

    return { isValid, message };
  };
}