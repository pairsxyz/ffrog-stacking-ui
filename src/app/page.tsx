"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import background from "../../public/background.webp";
import bush1 from "../../public/bush-1.webp";
import bush2 from "../../public/bush-2.webp";
import bush3 from "../../public/bush-3.webp";
import drFrog from "../../public/dr-frog.webp";
import frog from "../../public/frog.webp";
import ground from "../../public/ground.webp";
import leef from "../../public/leef.webp";
import rock from "../../public/rock.webp";
import mainText from "../../public/main-text.webp";
import poolText from "../../public/pool-text.webp";
import ConnectWalletModal from "@/components/modal/connect-wallet-modal";
import StakeModal from "@/components/modal/stake-modal";
import UnstakeModal from "@/components/modal/unstake-modal";
import { getFrogTokenBalance, initializeMoralis } from "@/lib/moralis";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const [connectWalletModalIsOpen, setConnectWalletModalIsOpen] =
    useState(false);
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false);
  const [unstakeModalIsOpen, setUnstakeModalIsOpen] = useState(false);
  const [frogBalance, setFrogBalance] = useState("0");

  const { publicKey: address, connected: isConnected } = useWallet();

  useEffect(() => {
    initializeMoralis();
  }, []);

  const handleOpenStakeModalButtonClick = async () => {
    setStakeModalIsOpen(true);

    if (address) {
      const bal = await getFrogTokenBalance(address.toBase58());
      setFrogBalance(bal);
    } else {
      setFrogBalance("0");
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center relative overflow-hidden">
      <Image
        className="object-cover -z-10"
        src={background}
        alt="background"
        fill
        priority
        sizes="100vw"
      />

      <div className="absolute left-[30%]">
        <Image
          className="w-[484px] h-[84px] object-contain"
          src={mainText}
          alt="background"
          priority
          sizes="100vw"
        />

        <p className="text-3xl font-medium text-[#005B0F]">POOL SIZE</p>
        <p className="text-base font-medium text-white text-start">
          Stake your $FFROG to participate in profit sharing from the
          <br /> entire $FFROG ecosystem. Rewards are issued daily.
        </p>
      </div>

      <div
        className="w-[278px] h-[129px] absolute right-20 top-0 flex items-center justify-center"
        //onClick={() => setConnectWalletModalIsOpen(true)}
      >
        <Image
          className="object-contain"
          src={leef}
          alt="background"
          priority
          sizes="100vw"
          fill
        />
        {/* <p className="text-xl font-medium text-[#005B0F] z-10">
          {isConnected ? "MANAGE" : "CONNECT"}
          <br /> WALLET
        </p> */}
        <WalletMultiButton
          style={{
            backgroundColor: "transparent",
          }}
        />
      </div>

      <button
        className="w-[250px] h-[159px] absolute right-20 top-[30%] flex items-center justify-center"
        onClick={() => setUnstakeModalIsOpen(true)}
      >
        <Image
          className="object-contain"
          src={bush3}
          alt="background"
          priority
          sizes="100vw"
          fill
        />
        <p className="text-xl font-medium text-[#005B0F] mt-[10%] z-10">
          UNSTAKE
        </p>
      </button>

      <div className="w-[473px] h-[256px] absolute left-[30%] top-[25%] flex flex-col items-center justify-center">
        <Image
          className="object-contain"
          src={bush1}
          alt="background"
          priority
          sizes="100vw"
          fill
        />
        <Image
          className="w-[213px] h-[75px] object-contain z-10"
          src={poolText}
          alt="background"
          priority
          sizes="100vw"
        />
        <p className="text-xl font-medium text-black z-10">18% APY</p>
        <p className="text-base font-medium text-black z-10">
          Unlock Period of 7 days
        </p>
        <p className="text-[10px] font-medium text-[#005B0F]">
          Once you unstake, a timer of 7 days will begin
        </p>
        <button
          className="w-[167px] h-[35px] rounded-[19px] border border-black z-10 bg-[#005B0F]"
          style={{ boxShadow: "2.096px 2.795px 2.795px 0px #000" }}
          onClick={handleOpenStakeModalButtonClick}
        >
          <span className="text-[25px] font-normal text-white">STAKE</span>
        </button>
      </div>

      <div className="w-[444px] h-[199px] absolute right-0 bottom-0 flex items-end justify-end">
        <Image
          className="object-contain"
          src={ground}
          alt="background"
          priority
          sizes="100vw"
          fill
        />
        <p className="text-[25px] font-medium text-[#826914] z-10 mb-[5%] mr-[8%]">
          COMING SOON...
        </p>
      </div>

      <Image
        className="w-[159px] h-[227px] object-contain absolute right-0 sm:right-[25%] bottom-[20%]"
        src={drFrog}
        alt="background"
        priority
        sizes="100vw"
      />

      <div className="w-[806px] h-[220px] absolute left-0 sm:left-[20%] bottom-8 flex flex-col items-center justify-center">
        <Image
          className="object-contain"
          src={rock}
          alt="background"
          priority
          sizes="100vw"
          fill
        />
        <p className="text-3xl font-medium text-[#3D3D3D] mt-4 z-10">
          MY STAKES & REWARDS
        </p>
        {!isConnected ? (
          <>
            <p className="text-2xl font-medium text-white z-10">
              Connect Your Wallet
            </p>
            <WalletMultiButton
              style={{
                backgroundColor: "#3D3D3D",
                borderRadius: "19px",
              }}
            />
            {/* <button
              className="w-[192px] h-[40px] mt-2 rounded-[19px] border border-black z-10 bg-[#3D3D3D]"
              style={{ boxShadow: "2.409px 3.212px 3.212px 0px #000;;" }}
              onClick={() => setConnectWalletModalIsOpen(true)}
            >
              <span className="text-base font-normal text-white">
                Connect Wallet
              </span>
            </button> */}
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="w-[344px] h-[219px] absolute left-0 top-[10%] flex items-center justify-center">
        <Image
          className="object-contain"
          src={bush2}
          alt="background"
          priority
          sizes="100vw"
          fill
        />
        <p className="text-xl font-medium text-white mr-10 z-10">
          NO $FFROG REWARDED
        </p>
      </div>

      <Image
        className="w-[200px] lg:w-[338px] h-[374px] object-contain absolute left-0 bottom-0"
        src={frog}
        alt="background"
        priority
        sizes="100vw"
      />

      {connectWalletModalIsOpen ? (
        <ConnectWalletModal
          handleCloseModal={() => setConnectWalletModalIsOpen(false)}
        />
      ) : null}

      {stakeModalIsOpen ? (
        <StakeModal
          balance={frogBalance}
          handleCloseModal={() => setStakeModalIsOpen(false)}
        />
      ) : null}

      {unstakeModalIsOpen ? (
        <UnstakeModal handleCloseModal={() => setUnstakeModalIsOpen(false)} />
      ) : null}
    </main>
  );
}
