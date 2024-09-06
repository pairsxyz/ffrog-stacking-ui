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
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "@/providers/ProgramProvider";
import { PublicKey } from "@solana/web3.js";
import { bnToRegular, GlobalStateData, UserAccountData } from "@/anchor/setup";
import { BN } from "@coral-xyz/anchor";
import dynamic from "next/dynamic";
import { cooper } from "@/styles/fonts";

export default function Home() {
  const [connectWalletModalIsOpen, setConnectWalletModalIsOpen] =
    useState(false);
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false);
  const [unstakeModalIsOpen, setUnstakeModalIsOpen] = useState(false);
  const [frogBalance, setFrogBalance] = useState("0");

  const { publicKey: address, connected: isConnected } = useWallet();
  const { program } = useProgram();
  const { connection } = useConnection();

  const [userAccountInfo, setUserAccountInfo] =
    useState<UserAccountData | null>();
  const [globalStateInfo, setGlobalStateInfo] =
    useState<GlobalStateData | null>();

  useEffect(() => {
    initializeMoralis();
  }, []);

  useEffect(() => {
    if (address && program) {
      const [userAccountPDA, userAccountBump] =
        PublicKey.findProgramAddressSync(
          [address!.toBuffer(), Buffer.from("user")],
          program!.programId
        );
      const [programStateAccount, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from("ny_state_of_mind")],
        program.programId
      );

      program.account.userAccount
        .fetch(userAccountPDA)
        .then((data) => setUserAccountInfo(data))
        .catch((e) => console.log(`ERROR FETCHING ACCOUNT DATA: `, e));
      program.account.globalStateAccount
        .fetch(programStateAccount)
        .then((data) => setGlobalStateInfo(data))
        .catch((e) => console.log(`ERROR FETCHING GLOBAL STATE DATA: `, e));

      const userAccountSubscriptionId = connection.onAccountChange(
        userAccountPDA,
        (accountInfo) => {
          setUserAccountInfo(
            program?.coder.accounts.decode("userAccount", accountInfo.data)
          );
        }
      );
      const globalStateSubscriptionId = connection.onAccountChange(
        programStateAccount,
        (globalState) => {
          setGlobalStateInfo(
            program?.coder.accounts.decode(
              "globalStateAccount",
              globalState.data
            )
          );
        }
      );

      return () => {
        connection.removeAccountChangeListener(userAccountSubscriptionId);
        connection.removeAccountChangeListener(globalStateSubscriptionId);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program, address]);

  const handleOpenStakeModalButtonClick = async () => {
    setStakeModalIsOpen(true);

    if (address) {
      const bal = await getFrogTokenBalance(address.toBase58());
      setFrogBalance(bal);
    } else {
      setFrogBalance("0");
    }
  };

  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  const getFormattedDate = (timestampInSeconds: number) => {
    const date = new Date(timestampInSeconds * 1000);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12 for 12 AM/PM

    return `${day}/${month}/${year}  ${hours}:${minutes} ${ampm}`;
  };

  const getCurrentRewards = () => {
    let totalRewards = 0;

    userAccountInfo?.stakes.forEach((stake) => {
      const start = bnToRegular(stake.startTime, 0) * 1000;
      const end =
        stake.unstakeTime.cmp(new BN(0)) > 0
          ? bnToRegular(stake.unstakeTime, 0) * 1000
          : Date.now();

      const amount = bnToRegular(stake.amount);
      const apy = bnToRegular(stake.apyAtStake, 2);

      const diff = end - start;

      const millisecondsInOneDay = 1000 * 60 * 60 * 24;
      const differenceInDays = Math.floor(diff / millisecondsInOneDay);

      const reward = amount * (apy / 100) * (differenceInDays / 365);

      totalRewards += reward;
    });

    return totalRewards.toFixed(2);
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
          {globalStateInfo?.currentApy
            ? `${bnToRegular(globalStateInfo?.currentApy!, 2)}% APY`
            : ``}
        </p>
        <p className="text-base font-medium text-black z-10">
          Unlock Period of 7 days
        </p>
        <p className="w-1/2 xl:w-full text-[10px] font-medium text-[#005B0F]">
          Once you unstake, a timer of 7 days will begin
        </p>
        <button
          className="w-[167px] h-[35px] flex items-center justify-center translate-y-10 sm:translate-y-8 xl:translate-y-0 rounded-[19px] border border-black z-10 bg-[#005B0F]"
          style={{ boxShadow: "2.096px 2.795px 2.795px 0px #000" }}
          onClick={handleOpenStakeModalButtonClick}
        >
          <span className="text-[25px] font-normal text-white">STAKE</span>
        </button>
        <button
          className="w-[167px] h-[35px] flex xl:hidden items-center justify-center translate-y-12 sm:translate-y-10 rounded-[19px] border border-black z-10 bg-[#005B0F]"
          style={{ boxShadow: "2.096px 2.795px 2.795px 0px #000" }}
          onClick={() => setUnstakeModalIsOpen(true)}
        >
          <span className="text-[23px] font-normal text-white">UNSTAKE</span>
        </button>
      </div>

      <div
        className="w-[162px] h-[86px] xl:w-[278px] xl:h-[129px] flex items-center justify-center absolute right-0 xl:right-20 top-[20%] xl:top-0"
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
        <WalletMultiButtonDynamic
          style={{
            backgroundColor: "transparent",
          }}
        >
          {!isConnected ? (
            <p
              className={`text-xs xl:text-xl font-medium text-[#005B0F] z-10 ${cooper.className}`}
            >
              CONNECT
              <br /> WALLET
            </p>
          ) : (
            <p
              className={`text-[8px] xl:text-xl font-medium text-[#3EC800] z-10 ${cooper.className}`}
              style={{
                WebkitTextStrokeWidth: "1px",
                WebkitTextStrokeColor: "#005B0F",
              }}
            >
              {`${address?.toString().slice(0, 4)}...${address
                ?.toString()
                .slice(-4)}` ?? "Address"}
            </p>
          )}
        </WalletMultiButtonDynamic>
      </div>

      <button
        className="w-[250px] h-[159px] absolute right-20 top-[30%] hidden xl:flex items-center justify-center"
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

      <div className="w-[133px] h-[72px] xl:w-[344px] xl:h-[219px] absolute left-0 top-[22%] xl:top-[10%] flex items-center justify-center z-20">
        {isConnected ? (
          userAccountInfo?.stakedAmount &&
          userAccountInfo.stakedAmount.cmp(new BN(0)) > 0 ? (
            <>
              <Image
                className="w-[133px] h-[72px] object-contain"
                src={bush2}
                alt="background"
                priority
                sizes="100vw"
                fill
              />
              <p
                className="w-[80%] text-[8px] text-xs xl:text-3xl font-medium text-white z-10"
                style={{
                  WebkitTextStrokeWidth: "1px",
                  WebkitTextStrokeColor: "#000",
                }}
              >
                {`CURRENT REWARDS: ${getCurrentRewards()} $FFROG`}
              </p>
            </>
          ) : (
            <>
              <Image
                className="w-[133px] h-[72px] object-contain"
                src={bush2}
                alt="background"
                priority
                sizes="100vw"
                fill
              />
              <p
                className="text-xs xl:text-xl font-medium text-white ml-4 xl:ml-0 z-10"
                style={{
                  WebkitTextStrokeWidth: "1px",
                  WebkitTextStrokeColor: "#000",
                }}
              >
                NO $FFROG REWARDED
              </p>
            </>
          )
        ) : null}
      </div>

      <div
        className="w-[777px] h-[212px] xl:w-[1019px] xl:h-[279px] flex flex-col items-center justify-center 4xl:translate-y-[180%] relative"
        style={{
          backgroundImage: "url(/rock.webp)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Image
          className="hidden xl:block w-[159px] h-[227px] object-contain absolute right-[15%] bottom-[60%] -z-10"
          src={drFrog}
          alt="background"
          priority
          sizes="100vw"
        />
        {!isConnected ? (
          <>
            <p className="text-base xl:text-3xl font-medium text-[#3D3D3D] mt-4 z-10">
              MY STAKES & REWARDS:
            </p>
            <p className="text-base xl:text-2xl font-medium text-white z-10">
              Connect Your Wallet
            </p>
            <WalletMultiButtonDynamic
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // width: "192px",
                height: "40px",
                backgroundColor: "#3D3D3D",
                borderRadius: "19px",
                border: "1px solid black",
                boxShadow: "2.409px 3.212px 3.212px 0px #000",
                marginTop: "8px",
              }}
            >
              <p
                className={`text-base xl:text-[20px] font-medium text-white ${cooper.className}`}
              >
                Connect Wallet
              </p>
            </WalletMultiButtonDynamic>
          </>
        ) : (
          <>
            {userAccountInfo?.stakedAmount &&
            userAccountInfo.stakedAmount.cmp(new BN(0)) > 0 ? (
              <>
                <p className="text-xl xl:text-3xl font-medium text-white z-10">
                  {`${bnToRegular(
                    userAccountInfo?.stakedAmount
                  )} $FFROG Staked`}
                </p>
                {userAccountInfo?.stakes.map((temp, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-2 items-start justify-center"
                  >
                    <p
                      className="text-xs xl:text-xl font-medium text-white z-10"
                      style={{
                        WebkitTextStrokeWidth: "1px",
                        WebkitTextStrokeColor: "#000",
                      }}
                    >
                      {` Stake ${index + 1}:`}
                    </p>
                    <p
                      className="text-xs xl:text-xl font-medium text-white z-10"
                      style={{
                        WebkitTextStrokeWidth: "1px",
                        WebkitTextStrokeColor: "#000",
                      }}
                    >
                      {`${bnToRegular(temp.amount)} $FFROG`}
                    </p>
                    {/* <p
                      className="text-xs xl:text-xl font-medium text-white z-10"
                      style={{
                        WebkitTextStrokeWidth: "1px",
                        WebkitTextStrokeColor: "#000",
                      }}
                    >
                      {`${bnToRegular(temp.apyAtStake, 2)}% APY`}
                    </p> */}
                    <p
                      className="text-xs xl:text-xl font-medium text-white z-10"
                      style={{
                        WebkitTextStrokeWidth: "1px",
                        WebkitTextStrokeColor: "#000",
                      }}
                    >
                      {getFormattedDate(bnToRegular(temp.startTime, 0))}
                    </p>
                    {/* <p
                      className="text-xs xl:text-xl font-medium text-white z-10"
                      style={{
                        WebkitTextStrokeWidth: "1px",
                        WebkitTextStrokeColor: "#000",
                      }}
                    >
                      {temp.unstakeTime.cmp(new BN(0)) > 0
                        ? getFormattedDate(bnToRegular(temp.unstakeTime, 0))
                        : "-"}
                    </p> */}
                  </div>
                ))}
              </>
            ) : (
              <>
                <Image
                  className="w-[86px] h-[94px] xl:w-[130px] xl:h-[142px] object-contain z-10"
                  src={frog2}
                  alt="background"
                  priority
                  sizes="100vw"
                />
                <p className="text-xl xl:text-[30px] font-medium text-white z-10">
                  No Stakes Yet
                </p>
              </>
            )}
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
          apy={
            globalStateInfo?.currentApy
              ? bnToRegular(globalStateInfo.currentApy, 2)
              : 0
          }
          handleCloseModal={() => setStakeModalIsOpen(false)}
        />
      ) : null}

      {unstakeModalIsOpen ? (
        <UnstakeModal
          userAccountData={userAccountInfo as UserAccountData}
          handleCloseModal={() => setUnstakeModalIsOpen(false)}
        />
      ) : null}
    </main>
  );
}
