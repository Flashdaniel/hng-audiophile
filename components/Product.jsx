"use client";
import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

export default function Product({ name, image }) {
  return (
    <Card
      className={`max-w-[350px] relative ${
        name === "SPEAKERS" && "mt-8 md:mt-0"
      }  gap-0 bg-[#F1F1F1] pt-25 hover:shadow-lg hover:scale-[1.02] transition-transform`}
    >
      <CardHeader>
        <Image
          className="m-auto absolute -top-20 left-[50%] translate-x-[-50%] fill-white drop-shadow-2xl/25 "
          src={image}
          alt={name}
          width={name == "EARPHONES" ? 178 : 121.4}
          height={name == "EARPHONES" ? 161 : 146}
        />
      </CardHeader>
      <CardContent>
        <h2 className="text-center text-[18px] font-bold tracking-[1.29px]">
          {name}
        </h2>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="gap-2 m-auto cursor-pointer">
          <span className="tracking-[1px] text-[13px] text-black/60 font-bold">
            SHOP
          </span>
          <ChevronRight className="text-orange-400" />
        </Button>
      </CardFooter>
    </Card>
  );
}
