import {
  AnchorProvider,
  BN,
  IdlAccounts,
  Program,
  setProvider,
  web3,
} from "@coral-xyz/anchor";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { AnchorWallet, WalletContextState } from "@solana/wallet-adapter-react";
import {
  Account,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
} from "@solana/spl-token";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { IDL, StakingContract } from "./idl";

const endpoint = process.env.NEXT_PUBLIC_SOL_RPC_PROVIDER;
if (!endpoint) {
  throw new Error("process.env.NEXT_PUBLIC_SOL_RPC_PROVIDER not defined");
}

export const PROGRAM_ID = new PublicKey(
  "DuAzjcYARK1AwEeqhG7AETHSdDcB1upYkCe8b5diDeQT"
);
export const TOKEN_MINT = new PublicKey(
  "9nJVEmiNFqLkueCGTsYtqAgx6v7wvckQEH5jzhBopump"
);
export const USER_POOL_VAULT_ADDRESS = new PublicKey(
  `CwtCpW1ysWRFowcpzfp3db1yofrmzeBGXuLX57yNL51Q`
);

export const SOLANA_NETWORK = WalletAdapterNetwork.Mainnet;
export const CONNECTION = new Connection(endpoint, "confirmed");
export const TOKEN_DECIMALS = 6;

export type UserAccountData = IdlAccounts<StakingContract>["userAccount"];
export type GlobalStateData =
  IdlAccounts<StakingContract>["globalStateAccount"];

export function initializeProgram(wallet: AnchorWallet | undefined) {
  if (!wallet) {
    throw new Error("Wallet not connected");
  }

  const provider = new AnchorProvider(CONNECTION, wallet, {});
  setProvider(provider);

  return new Program<StakingContract>(IDL, PROGRAM_ID, provider);
}

export async function getOrCreateAssociatedTokenAccountCustom(
  mint: PublicKey,
  wallet: WalletContextState,
  connection: Connection
) {
  const owner = wallet.publicKey;
  if (!owner) {
    throw new Error("Wallet not connected");
  }
  const associatedToken = await getAssociatedTokenAddress(mint, owner);

  let account: Account;
  try {
    account = await getAccount(connection, associatedToken);
  } catch (error: unknown) {
    if (
      error instanceof TokenAccountNotFoundError ||
      error instanceof TokenInvalidAccountOwnerError
    ) {
      try {
        const transaction = new web3.Transaction().add(
          createAssociatedTokenAccountInstruction(
            owner,
            associatedToken,
            owner,
            mint
          )
        );

        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = owner;

        const signedTransaction =
          wallet.signTransaction && (await wallet.signTransaction(transaction));
        console.log("signed tx: ", signedTransaction);

        if (signedTransaction) {
          const signature = await connection.sendRawTransaction(
            signedTransaction.serialize()
          );

          await connection.confirmTransaction(signature);
          console.log("CONFIRMED TX: ", signature);
        }
      } catch (error: unknown) {}
      account = await getAccount(connection, associatedToken);
    } else {
      throw error;
    }
  }
  return account;
}

export const getAssociatedTokenAccount = async (
  tokenMint: PublicKey,
  wallet: WalletContextState,
  connection: Connection
) => {
  if (!wallet.publicKey) {
    throw new Error("Address not defined");
  }

  try {
    const ataAddress = await getAssociatedTokenAddress(
      tokenMint,
      wallet.publicKey
    );

    const accountInfo = await connection.getAccountInfo(ataAddress);
    if (accountInfo === null) {
      const transaction = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey, // payer
          ataAddress, // ata
          wallet.publicKey, // owner
          tokenMint // mint
        )
      );

      const sig = await wallet.sendTransaction(transaction, connection);
      console.log("CREATE ATA SUCCESS: ", sig);

      const ata = await getAssociatedTokenAddress(tokenMint, wallet.publicKey);
      return ata;
    } else {
      return ataAddress;
    }
  } catch (error) {
    console.error("Error getting or creating ATA:", error);
    throw error;
  }
};

export async function stakeTokens(
  program: Program<StakingContract>,
  wallet: WalletContextState,
  amount: string
) {
  const [programStateAccount, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("ny_state_of_mind")],
    program.programId
  );

  const [userAccountPDA, userAccountBump] = PublicKey.findProgramAddressSync(
    [wallet.publicKey!.toBuffer(), Buffer.from("user")],
    program.programId
  );

  const userTokenAccountAddress = await getAssociatedTokenAccount(
    TOKEN_MINT,
    wallet,
    program.provider.connection
  );

  const numberAmount = parseFloat(amount);

  const amountInSmallestUnit = numberAmount * Math.pow(10, TOKEN_DECIMALS);
  const bnAmount = new BN(amountInSmallestUnit.toString());

  const tx = await program.methods
    .stakeTokens(bnAmount)
    .accounts({
      user: userAccountPDA,
      userTokenAccount: userTokenAccountAddress,
      userPoolVault: USER_POOL_VAULT_ADDRESS,
      programStateAccount: programStateAccount,
      signer: wallet.publicKey!,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: web3.SystemProgram.programId,
      mint: TOKEN_MINT,
    })
    .transaction();

  const signature = await wallet.sendTransaction(
    tx,
    program.provider.connection
  );

  // Confirm the transaction
  const { value } = await program.provider.connection.confirmTransaction(
    signature
  );

  if (value.err) {
    console.error("STAKE FAILED:", value.err);
    throw value.err;
  } else {
    console.log("STAKE SUCCESS:", signature);
  }
}

export async function unstakeAll(
  program: Program<StakingContract>,
  wallet: WalletContextState
) {
  const [userAccountPDA, userAccountBump] = PublicKey.findProgramAddressSync(
    [wallet.publicKey!.toBuffer(), Buffer.from("user")],
    program.programId
  );
  const tx = await program.methods
    .unstakeAll()
    .accounts({
      user: userAccountPDA,
      signer: wallet.publicKey!,
    })
    .transaction();

  const signature = await wallet.sendTransaction(
    tx,
    program.provider.connection
  );

  // Confirm the transaction
  const { value } = await program.provider.connection.confirmTransaction(
    signature
  );

  if (value.err) {
    console.error("UNSTAKE FAILED:", value.err);
    throw value.err;
  } else {
    console.log("UNSTAKE SUCCESS:", signature);
  }
}

export async function getUserAccountInfo(
  program: Program<StakingContract>,
  wallet: WalletContextState
): Promise<UserAccountData> {
  const [userAccountPDA, userAccountBump] = PublicKey.findProgramAddressSync(
    [wallet.publicKey!.toBuffer(), Buffer.from("user")],
    program.programId
  );

  const userAccountData = await program.account.userAccount.fetch(
    userAccountPDA
  );

  return userAccountData;
}

export const bnToRegular = (bnValue: BN, decimals: number = TOKEN_DECIMALS) => {
  const divisor = new BN(10).pow(new BN(decimals));
  return (
    bnValue.div(divisor).toNumber() +
    bnValue.mod(divisor).toNumber() / divisor.toNumber()
  );
};
