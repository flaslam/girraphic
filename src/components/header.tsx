import React from "react";
import Image from "next/image";
import logo from "../../public/images/logo.png";

const Header = () => {
  return (
    <div className="flex items-center px-4 py-4 md:px-8">
      <div className="grow">
        <div className="w-36 cursor-pointer hover:brightness-[200]">
          <Image src={logo} alt="Girraphic logo" priority />
        </div>
      </div>

      <div className="font-heading text-sm uppercase underline decoration-brand underline-offset-8">
        Media Information System
      </div>
    </div>
  );
};

export default Header;
