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
    allowUnsupportedChain: false,
    // featuredWalletIds: [
    //   "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
    //   "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
    // ],
  });

export default solanaConfig;
