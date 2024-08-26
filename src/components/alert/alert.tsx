import Image from "next/image";
import bush1 from "../../../public/bush-1.webp";
import success from "../../../public/success.webp";
import fail from "../../../public/fail.webp";

export default function Alert({ type }: { type: "SUCCESS" | "FAIL" }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      //   onClick={handleCloseModal}
    >
      <div
        className="w-[1028px] h-[618px] flex flex-col items-center justify-center relative z-20"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0px 0.346px 0.346px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex flex-col gap-4 items-center justify-center absolute top-20">
          <Image
            className="w-[212px] h-[212px] "
            src={type === "SUCCESS" ? success : fail}
            alt="background"
            sizes="100vw"
          />

          <p
            className="text-[40px] font-medium text-[#F5F5F5]"
            style={{
              WebkitTextStrokeWidth: 1.4,
              WebkitTextStrokeColor: "#000",
            }}
          >
            STAKING SUCCESSFUL
          </p>

          <button className="w-fit px-4 rounded-[30px] border-2 border-black bg-[#0C4800]">
            <span className="text-[33px] font-medium text-[#F5F5F5] uppercase">
              {type === "SUCCESS" ? "ok" : "try again"}
            </span>
          </button>
        </div>

        <Image
          className="w-[1415px] h-[699px]"
          src={bush1}
          alt="background"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
