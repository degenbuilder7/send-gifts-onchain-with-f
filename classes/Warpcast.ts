import { z } from "zod";

// Neynar's api
const apiUrl = "https://api.neynar.com";
const apiKey = "NEYNAR_ONCHAIN_KIT";

const validateMessageSchema = z.object({
  // has to be true
  valid: z.literal(true),
});

export const untrustedMetaDataSchema = z.object({
  url: z.string().startsWith("https://d1c5-2001-4490-48c5-7eaa-79be-89f8-2a09-554a.ngrok-free.app"),
});

export class Warpcast {
  public static async validateMessage(messageBytes: string) {
    const url = `${apiUrl}/v2/farcaster/frame/validate`;

    const response = await fetch(url, {
      headers: {
        api_key: apiKey,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        message_bytes_in_hex: messageBytes,
      }),
    });

    await response
      .json()
      .then((res) => res)
      .then(validateMessageSchema.parse);
  }
}