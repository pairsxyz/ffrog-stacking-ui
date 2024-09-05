import Moralis from "moralis";

export const initializeMoralis = async (): Promise<void> => {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    });
  }
};

export const getFrogTokenBalance = async (address: string): Promise<any> => {
  try {
    const response = await Moralis.SolApi.account.getSPL({
      network: "mainnet",
      address,
    });

    return response.raw.find((r) => r.symbol === `FFROG`)?.amount ?? `0`;
  } catch (e) {
    console.error(`Failed to fetch user balances: `, e);

    return `0`;
  }
};
