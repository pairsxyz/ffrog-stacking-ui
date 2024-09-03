import Image from "next/image";
import branchLeft from "../../../public/branch-left.webp";
import branchRight from "../../../public/branch-right.webp";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "@/providers/ProgramProvider";
import {
  getUserAccountInfo,
  TOKEN_DECIMALS,
  unstakeAll,
  UserAccountData,
} from "@/anchor/setup";
import { BN } from "@coral-xyz/anchor";

export default function UnstakeModal({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) {
  const [inputValue, setInputValue] = useState("0");
  const [userAccountInfo, setUserAccountInfo] =
    useState<UserAccountData | null>();

  const wallet = useWallet();
  const { program } = useProgram();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getUserAccountInfo(program!, wallet);
        console.log(data);
        setUserAccountInfo(data);
      } catch (e) {}
    };

    loadData();
  }, []);

  const bnToRegular = (bnValue: BN) => {
    const divisor = new BN(10).pow(new BN(TOKEN_DECIMALS));
    return (
      bnValue.div(divisor).toNumber() +
      bnValue.mod(divisor).toNumber() / divisor.toNumber()
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleMaxClick = () => {
    setInputValue(
      userAccountInfo?.stakedAmount
        ? bnToRegular(userAccountInfo.stakedAmount).toString()
        : "0"
    );
  };

  const handleUnstakeClick = async () => {
    if (!wallet.publicKey) {
      throw new Error("Address not defined");
    }

    if (!program?.provider.connection) {
      throw new Error("Connection not established");
    }

    try {
      await unstakeAll(program, wallet);
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleCloseModal}
    >
      <div
        className="w-full xl:w-3/4 h-3/4 flex flex-col items-center justify-center rounded-2xl border-4 border-[#00350E] relative z-20 bg-[#3EC800]"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0px 0.346px 0.346px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex flex-col gap-3 items-center justify-center mt-0 xl:mt-28">
          <p
            className="text-base xl:text-3xl font-medium text-[#F5F5F5] text-center"
            style={{
              WebkitTextStrokeWidth: 1.4,
              WebkitTextStrokeColor: "#000",
            }}
          >
            HOW MANY TOKENS WOULD YOU LIKE TO
            <br /> UNSTAKE?
          </p>

          {/* FOR WHEN CICKED ON UNSTAKE AGAIN WHEN ALREADY HAS UNSTAKED */}
          {/* <p
            className="w-3/4 text-base xl:text-3xl font-medium text-[#F5F5F5] text-center mb-20"
            style={{
              WebkitTextStrokeWidth: 1.4,
              WebkitTextStrokeColor: "#000",
            }}
          >
            YOUR $FFROG WILL ARRIVE IN YOUR WALLET IN 6 DAYS AND 59 MINUTES
          </p>

          <button
            className="w-[180px] h-[49px] xl:w-[280px] xl:h-[69px] flex items-center justify-center p-1 rounded-lg border-4 border-black bg-[#F6EFDB]"
            onClick={handleCloseModal}
          >
            <span className="text-base xl:text-[35px] font-medium text-black">OK</span>
          </button> */}

          <div className="w-2/3 xl:w-[682px] flex flex-row gap-2 items-center justify-between px-6 py-3 rounded-lg border-4 border-black bg-[#F6EFDB]">
            <input
              className="w-full h-full outline-none bg-[#F6EFDB]"
              type="number"
              //value={inputValue}
              value={
                userAccountInfo?.stakedAmount
                  ? bnToRegular(userAccountInfo.stakedAmount).toString()
                  : "0"
              }
              onChange={handleInputChange}
              disabled
            />
            <p
              className="text-base xl:text-3xl font-medium text-[#F5F5F5]"
              style={{
                WebkitTextStrokeWidth: 1.4,
                WebkitTextStrokeColor: "#000",
              }}
              onClick={handleMaxClick}
            >
              MAX
            </p>
          </div>

          <p
            className="self-center xl:self-start underline text-base xl:text-xl font-medium text-[#F5F5F5]"
            style={{
              WebkitTextStrokeWidth: 1.4,
              WebkitTextStrokeColor: "#000",
            }}
          >
            FFROG Staked:{" "}
            {userAccountInfo?.stakedAmount
              ? bnToRegular(userAccountInfo.stakedAmount)
              : 0}
          </p>
        </div>

        <button
          className="w-2/3 h-1/3 xl:w-[332px] xl:h-[69px] flex items-center justify-center p-2 rounded-lg border-4 border-black bg-[#F6EFDB]"
          onClick={handleUnstakeClick}
        >
          <span className="text-base xl:text-[45px] font-medium text-black">
            UNSTAKE
          </span>
        </button>
      </div>

      <Image
        className="w-[373px] h-[373px] hidden xl:block  absolute -left-10 -top-24"
        src={branchLeft}
        alt="background"
        sizes="100vw"
      />

      <Image
        className="w-[373px] h-[373px] hidden xl:block  absolute -right-16 -top-24"
        src={branchRight}
        alt="background"
        sizes="100vw"
      />
    </div>
  );
}
