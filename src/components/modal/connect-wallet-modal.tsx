import Image from "next/image";
import flowers from "../../../public/flowers.webp";
import drFrog from "../../../public/dr-frog.webp";
import frog from "../../../public/frog.webp";
import mainText from "../../../public/main-text.webp";
import walletConnectLogo from "../../../public/wallet-connect-logo.webp";

export default function ConnectWalletModal({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleCloseModal}
    >
      <div
        className="w-full xl:w-3/4 h-3/4 flex flex-col items-center rounded-2xl border-4 border-[#00350E] relative z-20 bg-[#3EC800]"
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

          <button className="w-2/3 flex items-center justify-center px-4 xl:px-6 py-3 mt-28 rounded-lg border-4 border-black bg-[#F6EFDB]">
            <Image
              className="w-[168px] h-[21px] xl:w-[258px] xl:h-[51px]"
              src={walletConnectLogo}
              alt="background"
              sizes="100vw"
            />
          </button>

          {/* Dissconnet */}
          {/* <button className="w-2/3 flex items-center justify-center px-6 py-3 rounded-lg border-4 border-black bg-[#F6EFDB]">
            <span
              className="text-3xl font-medium text-white"
              style={{
                WebkitTextStrokeWidth: 1.4,
                WebkitTextStrokeColor: "#000",
              }}
            >
              DISCONNECT WALLET
            </span>
          </button> */}
        </div>

        <Image src={flowers} alt="background" fill sizes="100vw" />

        <Image
          className="w-[200px] h-[300px] hidden xl:block absolute -right-14 top-10 z-30"
          src={drFrog}
          alt="background"
          sizes="100vw"
        />

        <Image
          className="w-[200px] h-[200px] hidden xl:block absolute left-[40%] bottom-0 z-30"
          src={frog}
          alt="background"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
