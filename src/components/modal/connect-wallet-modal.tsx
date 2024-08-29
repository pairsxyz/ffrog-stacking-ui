import Image from "next/image";
import { useWeb3Modal } from "@web3modal/solana/react";
import flowers from "../../../public/flowers.webp";
import drFrog from "../../../public/dr-frog.webp";
import frog from "../../../public/frog.webp";
import mainText from "../../../public/main-text.webp";
import walletConnectLogo from "../../../public/wallet-connect-logo.webp";
import phantomLogo from "../../../public/phantom-logo.webp";

export default function ConnectWalletModal({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) {
  const { open } = useWeb3Modal();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleCloseModal}
    >
      <div
        className="w-[1028px] h-[618px] flex flex-col items-center rounded-2xl border-4 border-[#00350E] relative z-20 bg-[#3EC800]"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0px 0.346px 0.346px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="w-full flex flex-col gap-3 items-center justify-center">
          <Image
            className="w-[504px] h-[87px] mb-5"
            src={mainText}
            alt="background"
            sizes="100vw"
          />

          <button
            className="w-[682px] flex items-center justify-center px-6 py-3 rounded-lg border-4 border-black bg-[#F6EFDB]"
            onClick={() => open()}
          >
            <Image
              className="w-[258px] h-[51px]"
              src={walletConnectLogo}
              alt="background"
              sizes="100vw"
            />
          </button>

          {/* Dissconnet */}
          {/* <button className="w-[682px] flex items-center justify-center px-6 py-3 rounded-lg border-4 border-black bg-[#F6EFDB]">
            <span
              className="text-[30px] font-medium text-white"
              style={{
                WebkitTextStrokeWidth: 1.4,
                WebkitTextStrokeColor: "#000",
              }}
            >
              DISCONNECT WALLET
            </span>
          </button> */}
        </div>

        <Image
          className="z-[-1]"
          src={flowers}
          alt="background"
          fill
          sizes="100vw"
        />

        <Image
          className="w-[200px] h-[300px] absolute -right-14 top-10 z-30"
          src={drFrog}
          alt="background"
          sizes="100vw"
        />

        <Image
          className="w-[200px] h-[200px] absolute left-[40%] bottom-0 z-30"
          src={frog}
          alt="background"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
