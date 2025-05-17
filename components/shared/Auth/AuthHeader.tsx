import Image from "next/image";
import React from "react";

interface Props {
  title1: string;
  title2: string;
  desc: string;
}

const AuthHeader = ({ title1, title2, desc }: Props) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="mb-[35px] md:mb-[50px] lg:mb-[69px]">
        <Image src="/images/auth-logo.png" alt="Logo" width={94} height={80} />
      </div>

      {/* Heading */}
      <div className="text-center">
        <h1 className="font-avenir text-2xl md:text-3xl lg:text-4xl font-extrabold text-black leading-[130%] tracking-[1.08px] mb-2">
          {title1} <span className="text-[#9b2c3e]">{title2}</span>
        </h1>
        <p className="font-avenir text-base font-normal text-black leading-[150%] tracking-[0%] pb-[12px] md:pb-[15px]">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default AuthHeader;
