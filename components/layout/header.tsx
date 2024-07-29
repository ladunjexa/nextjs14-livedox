import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href="/" className="md:flex-1">
        <Image
          src="/assets/icons/logo.svg"
          width={120}
          height={32}
          alt="logo"
          className="hidden md:block"
        />
        <Image
          src="/assets/icons/logo-icon.svg"
          width={32}
          height={32}
          alt="logo icon"
          className="mr-2 md:hidden"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
