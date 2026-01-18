import Image from "next/image";
import React from "react";
import GithubLogo from "@/public/github-logo.png";

interface Props {
  className: string;
}
export default function GithubIcon({ className }: Props) {
  return (
    <Image
      src={GithubLogo}
      alt="github icon"
      className={className}
      width={10}
      height={10}
    />
  );
}
