import { createWeb3Modal, defaultSolanaConfig } from "@web3modal/solana/react";
import { solana } from "@web3modal/solana/chains";

const chains = [solana];

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID;

if (!projectId) throw new Error("WallectConnect Project ID not defined");

const metadata = {
  name: "FFROG staking",
  description: "A pairs.xyz app",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const solanaConfig = defaultSolanaConfig({
  metadata,
  chains,
  projectId,
});

export const createSolanaWeb3Modal = () =>
  createWeb3Modal({
    solanaConfig,
    chains,
    projectId,
    defaultChain: solana,
  });

export default solanaConfig;
