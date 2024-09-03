"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import background from "../../public/background.webp";
import bush2 from "../../public/bush-2.webp";
import bush3 from "../../public/bush-3.webp";
import drFrog from "../../public/dr-frog.webp";
import frog from "../../public/frog.webp";
import ground from "../../public/ground.webp";
import leef from "../../public/leef.webp";
import mainText from "../../public/main-text.webp";
import frog2 from "../../public/frog-2.webp";
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

      <div className="w-full flex flex-col gap-2 items-center justify-center">
        <Image
          className="w-[349px] h-[61px] xl:w-[484px] xl:h-[84px] object-contain"
          src={mainText}
          alt="background"
          priority
          sizes="100vw"
        />

        <div className="w-full xl:w-[45%] flex flex-col items-center xl:items-start justify-center">
          <p className="text-3xl font-medium text-[#005B0F] text-center xl:text-start">
            POOL SIZE
          </p>
          <p className="text-[8px] xl:text-base font-medium text-white text-center xl:text-start">
            Stake your $FFROG to participate in profit sharing from the
            <br /> entire $FFROG ecosystem. Rewards are issued daily.
          </p>
        </div>
      </div>

      <div
        className="w-[340px] h-[190px] xl:w-[473px] xl:h-[256px] mt-[25%] md:mt-10 flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: "url(/bush-1.webp)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Image
          className="w-[139px] h-[49px] xl:w-[213px] xl:h-[75px] object-contain z-10"
          src={poolText}
          alt="background"
          priority
          sizes="100vw"
        />
        <p className="text-base xl:text-xl font-medium text-black z-10">
          18% APY
        </p>
        <p className="text-base font-medium text-black z-10">
          Unlock Period of 7 days
        </p>
        <p className="w-1/2 xl:w-full text-[10px] font-medium text-[#005B0F]">
          Once you unstake, a timer of 7 days will begin
        </p>
        <button
          className="w-[167px] h-[35px] translate-y-16 sm:translate-y-10 xl:translate-y-0 rounded-[19px] border border-black z-10 bg-[#005B0F]"
          style={{ boxShadow: "2.096px 2.795px 2.795px 0px #000" }}
          onClick={handleOpenStakeModalButtonClick}
        >
          <span className="text-[25px] font-normal text-white">STAKE</span>
        </button>
      </div>

      <button
        className="w-[200px] xl:w-[278px] h-[129px] hidden xl:flex items-center justify-center absolute right-20 top-0"
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
        {/* <p className="text-base xl:text-xl font-medium text-[#005B0F] z-10">
          CONNECT
          <br /> WALLET
        </p> */}
        <WalletMultiButton
          style={{
            backgroundColor: "transparent",
          }}
        />
      </button>

      <button
        className="w-[150px] h-[96px] xl:w-[250px] xl:h-[159px] absolute right-0 md:right-20 top-[20%] xl:top-[30%] flex items-center justify-center z-20 xl:z-0"
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
        <p className="text-xs xl:text-xl font-medium text-[#005B0F] mt-[10%] z-10">
          UNSTAKE
        </p>
      </button>

      <div className="w-[133px] h-[72px] xl:w-[344px] xl:h-[219px] absolute left-0 top-[22%] xl:top-[10%] flex items-center justify-center z-20">
        {/* TODO: NO STAKE STATE */}
        {/* <Image
          className="w-[133px] h-[72px] object-contain"
          src={bush2}
          alt="background"
          priority
          sizes="100vw"
          fill
        />
        <p className="text-xs xl:text-xl font-medium text-white ml-4 xl:ml-0 z-10">
          NO $FFROG REWARDED
        </p> */}

        {/* TODO: FROG STAKED */}
        {/* <p className="w-[80%] text-[8px] xl:text-3xl font-medium text-white z-10">
          CURRENT REWARDS 2,000 $FFROG
        </p> */}
      </div>

      <div
        className="w-[777px] h-[212px] xl:w-[1019px] xl:h-[279px] flex flex-col items-center justify-center 4xl:translate-y-[180%]"
        style={{
          backgroundImage: "url(/rock.webp)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <p className="text-base xl:text-3xl font-medium text-[#3D3D3D] mt-4 z-10">
          MY STAKES & REWARDS
        </p>
        {!isConnected ? (
          <>
            <p className="text-base xl:text-2xl font-medium text-white z-10">
              Connect Your Wallet
            </p>
            <WalletMultiButton
              style={{
                backgroundColor: "#3D3D3D",
                borderRadius: "19px",
              }}
            />
          </>
        ) : (
          <>
            {/* TODO: NO STAKE STATE */}
            {/* <Image
          className="w-[86px] h-[94px] xl:w-[130px] xl:h-[142px] object-contain z-10"
          src={frog2}
          alt="background"
          priority
          sizes="100vw"
        />
        <p className="text-xl xl:text-3xl font-medium text-white z-10">No Stakes Yet</p> */}

            {/* TODO: FROG STAKED */}
            {/* <p className="text-xl xl:text-3xl font-medium text-white z-10">
          500,000 $FFROG Staked
        </p> */}
          </>
        )}
      </div>

      <div className="w-[283px] h-[111px] xl:w-[444px] xl:h-[199px] absolute right-0 bottom-0 flex items-end justify-end z-10">
        <Image
          className="object-cover"
          src={ground}
          alt="background"
          priority
          sizes="100vw"
          fill
        />
        <p className="text-base xl:text-[25px] font-medium text-[#826914] z-10 mb-[5%] mr-[8%]">
          COMING SOON...
        </p>
      </div>

      <Image
        className="hidden xl:block w-[159px] h-[227px] object-contain absolute right-0 sm:right-[25%] bottom-[25%] -z-10"
        src={drFrog}
        alt="background"
        priority
        sizes="100vw"
      />

      <Image
        className="hidden xl:block w-[200px] xl:w-[338px] h-[374px] object-contain absolute left-0 bottom-0"
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
