import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";

const LogoIcon = () => {
  return (
    <Link href="/">
      <Image
        src={"/logo.jpg"}
        alt=""
        width={200}
        height={40}
        objectFit="cover"
      />
      {/* MensCloset Admin */}
    </Link>
  );
};

export default LogoIcon;
