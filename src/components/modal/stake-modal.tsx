import Image from "next/image";
import branchLeft from "../../../public/branch-left.webp";
import branchRight from "../../../public/branch-right.webp";
import board from "../../../public/board.webp";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "@/providers/ProgramProvider";
import { stakeTokens } from "@/anchor/setup";
import Alert from "../alert/alert";
import { getCountdown } from "@/utils/dateHelpers";

export default function StakeModal({
  balance,
  apy,
  unstakePending,
  unstakeFinished,
  freezeEndDate,
  handleCloseModal,
}: {
  balance: string;
  apy: number | undefined;
  unstakePending: boolean;
  unstakeFinished: boolean;
  freezeEndDate: number | undefined;
  handleCloseModal: () => void;
}) {
  const [inputValue, setInputValue] = useState("0");
  const [pending, setPending] = useState(false);
  const [stakeFinished, setStakeFinished] = useState(false);
  const [stakeSuccess, setStakeSuccess] = useState(false);
  const [countdown, setCountdown] = useState([0, 0, 0]);

  const wallet = useWallet();
  const { program } = useProgram();

  useEffect(() => {
    if (freezeEndDate) {
      const initialCountdown = getCountdown(freezeEndDate);
      setCountdown(initialCountdown);
    }
  }, [freezeEndDate]);

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
      setPending(true);
      await stakeTokens(program, wallet, inputValue);
      setStakeSuccess(true);
    } catch (e) {
      console.log("ERROR: ", e);
      setStakeSuccess(false);
    } finally {
      setPending(false);
      setStakeFinished(true);
    }
  };

  return !stakeFinished ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleCloseModal}
    >
      <div
        className="w-full xl:w-3/4 h-3/4 flex flex-col items-center justify-center rounded-2xl border-4 border-[#00350E] relative z-20 bg-[#3EC800]"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: "0px 0.346px 0.346px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        {!unstakePending && !unstakeFinished ? (
          <>
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
                  {apy}% APY
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
              disabled={pending || !wallet.publicKey || inputValue === "0"}
            >
              <span className="text-base xl:text-[45px] font-medium text-black">
                STAKE
              </span>
            </button>

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
          </>
        ) : !unstakePending && unstakeFinished ? (
          <>
            <p
              className="w-3/4 text-base xl:text-3xl font-medium text-[#F5F5F5] text-center mb-20"
              style={{
                WebkitTextStrokeWidth: 1.4,
                WebkitTextStrokeColor: "#000",
              }}
            >
              {`PLEASE WITHDRAW UNSTAKED FUNDS TO STAKE AGAIN`}
            </p>

            <button
              className="w-[180px] h-[49px] xl:w-[280px] xl:h-[69px] flex items-center justify-center p-1 rounded-lg border-4 border-black bg-[#F6EFDB]"
              onClick={handleCloseModal}
            >
              <span className="text-base xl:text-[35px] font-medium text-black">
                OK
              </span>
            </button>
          </>
        ) : (
          <>
            <p
              className="w-3/4 text-base xl:text-3xl font-medium text-[#F5F5F5] text-center mb-20"
              style={{
                WebkitTextStrokeWidth: 1.4,
                WebkitTextStrokeColor: "#000",
              }}
            >
              {`PLEASE WAIT ${countdown[0]} DAYS ${countdown[1]} HOURS AND ${countdown[2]} MINUTES TO STAKE AGAIN`}
            </p>

            <button
              className="w-[180px] h-[49px] xl:w-[280px] xl:h-[69px] flex items-center justify-center p-1 rounded-lg border-4 border-black bg-[#F6EFDB]"
              onClick={handleCloseModal}
            >
              <span className="text-base xl:text-[35px] font-medium text-black">
                OK
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  ) : (
    <Alert
      type={`${stakeSuccess ? "SUCCESS" : "FAIL"}`}
      mode="STAKE"
      handleCloseModal={() => setStakeFinished(false)}
      handleButtonClick={() => setStakeFinished(false)}
    />
  );
}
