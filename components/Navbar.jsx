"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-black">
      <div className=" max-w-[1110px] m-auto flex items-center justify-between px-6 py-6">
        <Button
          className="text-white cursor-pointer hover:bg-white/10 md:hidden"
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(true)}
        >
          <Image src="/icon-menu.svg" alt="Menu" width={16} height={15} />
        </Button>
        <Link href="/">
          <Image
            src="/audiophile.png"
            alt="Audiophile"
            width={143}
            height={25}
          />
        </Link>
        <ul
          className={`fixed md:relative ${
            !isMenuOpen && "hidden md:flex justify-center"
          } top-0 left-0 w-full h-full bg-black text-[13px] text-white flex flex-col justify-center items-center gap-8 text-lg font-light uppercase md:static md:flex-row md:bg-transparent md:text-black md:gap-10`}
        >
          <li>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer md:hidden absolute top-6 right-6 "
              onClick={() => setIsMenuOpen(false)}
            >
              <X />
            </Button>
          </li>
          <li>
            <Link href="/" className="hover:underline text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:underline text-white">
              HEADPHONES
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:underline text-white">
              SPEAKERS
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:underline text-white">
              EARPHONES
            </Link>
          </li>
        </ul>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/10 cursor-pointer"
        >
          <Image src="/icon-cart.svg" alt="Cart" width={24} height={20} />
        </Button>
      </div>
    </nav>
  );
}
