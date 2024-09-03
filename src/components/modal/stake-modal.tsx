import Image from "next/image";
import branchLeft from "../../../public/branch-left.webp";
import branchRight from "../../../public/branch-right.webp";

export default function StakeModal({
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
            <input className="w-full h-full outline-none bg-[#F6EFDB]" />
            <p
              className="text-base xl:text-3xl font-medium text-[#F5F5F5]"
              style={{
                WebkitTextStrokeWidth: 1.4,
                WebkitTextStrokeColor: "#000",
              }}
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
            FFROG Available:
          </p>

          <button className="w-2/3 h-1/3 xl:w-[332px] xl:h-[69px] flex items-center justify-center p-2 rounded-lg border-4 border-black bg-[#F6EFDB]">
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
    </div>
  );
}
