import Image from "next/image";
import branchLeft from "../../../public/branch-left.webp";
import branchRight from "../../../public/branch-right.webp";
import board from "../../../public/board.webp";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "@/providers/ProgramProvider";
import {
  getAssociatedTokenAccount,
  stakeTokens,
  TOKEN_MINT,
} from "@/anchor/setup";

export default function StakeModal({
  balance,
  handleCloseModal,
}: {
  balance: string;
  handleCloseModal: () => void;
}) {
  const [inputValue, setInputValue] = useState("0");

  const wallet = useWallet();
  const { program } = useProgram();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleMaxClick = () => {
    setInputValue(balance);
  };

  const handleStakeClick = async () => {
    if (!wallet.publicKey) {
      throw new Error("Address not defined");
    }

    if (!program?.provider.connection) {
      throw new Error("Connection not established");
    }

    try {
      await stakeTokens(program, wallet, inputValue);
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
        <div
          className="w-[249px] h-[180px] xl:w-[417px] xl:h-[300px] flex flex-col items-center justify-center p-4"
          style={{
            backgroundImage: "url(/board.webp)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-[157px] h-[102px] xl:w-[317px] xl:h-[182px] mb-[12%] rounded-lg border-4 border-black bg-[#F6EFDB] flex items-center justify-center">
            <p
              className="text-base xl:text-[36px] font-medium text-white"
              style={{
                WebkitTextStrokeWidth: 1.4,
                WebkitTextStrokeColor: "#000",
              }}
            >
              18% APY
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="w-2/3 xl:w-[682px] flex flex-row gap-2 items-center justify-between px-6 py-3 rounded-lg border-4 border-black bg-[#F6EFDB]">
            <input
              className="w-full h-full outline-none bg-[#F6EFDB]"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
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
            FFROG Available: {balance}
          </p>
        </div>

        <button
          className="w-2/3 h-1/3 xl:w-[332px] xl:h-[69px] flex items-center justify-center p-2 rounded-lg border-4 border-black bg-[#F6EFDB]"
          onClick={handleStakeClick}
        >
          <span className="text-base xl:text-[45px] font-medium text-black">
            STAKE
          </span>
        </button>
      </div>

      <Image
        className="w-[373px] h-[373px] hidden xl:block absolute -left-10 -top-24"
        src={branchLeft}
        alt="background"
        sizes="100vw"
      />

      <Image
        className="w-[373px] h-[373px] hidden xl:block absolute -right-16 -top-24"
        src={branchRight}
        alt="background"
        sizes="100vw"
      />
    </div>
  );
}
