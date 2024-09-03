"use client";
import React, { createContext, useContext, useMemo } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Program } from "@coral-xyz/anchor";
import { initializeProgram } from "@/anchor/setup";
import { StakingContract } from "@/anchor/idl";

interface ProgramContextType {
  program: Program<StakingContract> | null;
}

const ProgramContext = createContext<ProgramContextType>({
  program: null,
});

export const useProgram = () => useContext(ProgramContext);

export default function ProgramProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const wallet = useAnchorWallet();

  const program = useMemo(() => {
    if (wallet) {
      return initializeProgram(wallet);
    }
    return null;
  }, [wallet]);

  return (
    <ProgramContext.Provider value={{ program }}>
      {children}
    </ProgramContext.Provider>
  );
}
