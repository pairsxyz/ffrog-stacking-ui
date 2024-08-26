import Image from "next/image";
import background from "../../public/background.webp";
import bush1 from "../../public/bush-1.webp";
import bush2 from "../../public/bush-2.webp";
import bush3 from "../../public/bush-3.webp";
import drFrog from "../../public/dr-frog.webp";
import frog from "../../public/frog.webp";
import ground from "../../public/ground.webp";
import leave from "../../public/leave.webp";
import rock from "../../public/rock.webp";
import mainText from "../../public/main-text.webp";
import poolText from "../../public/pool-text.webp";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col relative">
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
          className="w-[612px] h-[107px] object-contain"
          src={mainText}
          alt="background"
          priority
          sizes="100vw"
        />

        <p className="text-[45px] font-medium text-[#005B0F]">POOL SIZE</p>
        <p className="text-[22px] font-medium text-white text-start">
          Stake your $FFROG to participate in profit sharing from the entire
          $FFROG ecosystem. Rewards are issued daily.
        </p>
      </div>

      <div className="w-[383px] h-[178px] absolute right-0 top-0 flex items-center justify-center">
        <Image
          className="object-contain"
          src={leave}
          alt="background"
          priority
          sizes="100vw"
          fill
        />
        <p className="text-2xl font-medium text-[#005B0F] z-10">
          CONNECT WALLET
        </p>
      </div>

      <div className="w-[344px] h-[219px] absolute right-0 top-[20%] flex items-center justify-center">
        <Image
          className="object-contain"
          src={bush3}
          alt="background"
          priority
          sizes="100vw"
          fill
        />
        <p className="text-2xl font-medium text-[#005B0F] mt-[10%] z-10">
          UNSTAKE
        </p>
      </div>

      <div className="w-[651px] h-[353px] absolute left-[25%] top-[20%] flex flex-col items-center justify-center">
        <Image
          className="object-contain"
          src={bush1}
          alt="background"
          priority
          sizes="100vw"
          fill
        />
        <Image
          className="w-[294px] h-[104px] object-contain z-10"
          src={poolText}
          alt="background"
          priority
          sizes="100vw"
        />
        <p className="text-[30px]font-medium text-black z-10">18% APY</p>
        <p className="text-[22px]font-medium text-black z-10">
          Unlock Period of 7 days
        </p>
        <p className="text-[15px] font-medium text-[#005B0F]">
          Once you unstake, a timer of 7 days will begin
        </p>
        <button
          className="w-[230px] h-[49px] rounded-[19px] border border-black z-10 bg-[#005B0F]"
          style={{ boxShadow: "2.882px 3.843px 3.843px 0px #000" }}
        >
          <span className="text-[35px] font-normal text-white">STAKE</span>
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
        <p className="text-[35px] font-medium text-[#826914] z-10 mb-[5%] mr-[8%]">
          COMING SOON...
        </p>
      </div>

      <Image
        className="w-[220px] h-[313px] object-contain absolute right-0 sm:right-[25%] bottom-[20%]"
        src={drFrog}
        alt="background"
        priority
        sizes="100vw"
      />

      <div className="w-[800px] h-[279px] absolute left-0 sm:left-[20%] bottom-8 flex flex-col items-center justify-center">
        <Image
          className="object-contain"
          src={rock}
          alt="background"
          priority
          sizes="100vw"
          fill
        />
        <p className="text-[35px] font-medium text-[#3D3D3D] mt-4 z-10">
          MY STAKES & REWARDS
        </p>
        <p className="text-[30px] font-medium text-white z-10">
          Connect Your Wallet
        </p>
        <button
          className="w-[230px] h-[49px] rounded-[19px] border border-black z-10 bg-[#3D3D3D]"
          style={{ boxShadow: "2.882px 3.843px 3.843px 0px #000" }}
        >
          <span className="text-xl font-normal text-white">Connect Wallet</span>
        </button>
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
        <p className="text-xl font-medium text-white z-10">
          NO $FFROG REWARDED
        </p>
      </div>

      <Image
        className="w-[200px] lg:w-[464px] object-contain absolute left-0 bottom-0"
        src={frog}
        alt="background"
        priority
        sizes="100vw"
      />
    </main>
  );
}
