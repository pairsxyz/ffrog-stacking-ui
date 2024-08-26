import Image from "next/image";
import branchLeft from "../../../public/branch-left.webp";
import branchRight from "../../../public/branch-right.webp";

export default function UnstakeModal({
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
        className="w-[1028px] h-[618px] flex flex-col items-center justify-center rounded-2xl border-4 border-[#00350E] relative z-20 bg-[#3EC800]"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0px 0.346px 0.346px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex flex-col gap-3 items-center justify-center mt-20">
          <p
            className="text-[30px] font-medium text-[#F5F5F5] text-center"
            style={{
              WebkitTextStrokeWidth: 1.4,
              WebkitTextStrokeColor: "#000",
            }}
          >
            HOW MANY TOKENS WOULD YOU LIKE TO
            <br /> UNSTAKE?
          </p>

          <div className="w-[682px] flex flex-row gap-2 items-center justify-between px-6 py-3 rounded-lg border-4 border-black bg-[#F6EFDB]">
            <input className="w-full h-full outline-none bg-[#F6EFDB]" />
            <p
              className="text-[30px] font-medium text-[#F5F5F5]"
              style={{
                WebkitTextStrokeWidth: 1.4,
                WebkitTextStrokeColor: "#000",
              }}
            >
              MAX
            </p>
          </div>

          <div
            className="self-start underline text-xl font-medium text-[#F5F5F5]"
            style={{
              WebkitTextStrokeWidth: 1.4,
              WebkitTextStrokeColor: "#000",
            }}
          >
            <p>FFROG Staked: </p>
          </div>

          <button className="w-[332px] flex items-center justify-center p-2 rounded-lg border-4 border-black bg-[#F6EFDB]">
            <span className="text-[45px] font-medium text-black">UNSTAKE</span>
          </button>
        </div>

        <Image
          className="w-[373px] h-[373px] absolute -left-10 -top-24"
          src={branchLeft}
          alt="background"
          sizes="100vw"
        />

        <Image
          className="w-[373px] h-[373px] absolute -right-16 -top-24"
          src={branchRight}
          alt="background"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
