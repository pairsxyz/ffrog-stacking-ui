"use client";

import React, { ReactNode } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletConnectWalletAdapter } from "@solana/wallet-adapter-walletconnect";

import "@solana/wallet-adapter-react-ui/styles.css";
import { SOLANA_NETWORK } from "@/anchor/setup";

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID;

if (!projectId) throw new Error("WallectConnect Project ID not defined");

export default function Web3ModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const network = SOLANA_NETWORK;
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint = process.env.NEXT_PUBLIC_SOL_RPC_PROVIDER;

  if (!endpoint) {
    throw new Error("process.env.NEXT_PUBLIC_SOL_RPC_PROVIDER not defined");
  }

  const wallets = useMemo(
    () => [
      new WalletConnectWalletAdapter({
        network,
        options: {
          projectId,
        },
      }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
