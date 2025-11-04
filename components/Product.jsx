"use client";
import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

export default function Product({ name, image }) {
  const [added, setAdded] = React.useState(false);

  function getPrice(name) {
    switch (name) {
      case "HEADPHONES":
        return 299.99;
      case "SPEAKERS":
        return 499.99;
      case "EARPHONES":
        return 99.99;
      default:
        return 0;
    }
  }

  function addToCart() {
    try {
      const id = name.toLowerCase();
      const price = getPrice(name);
      const raw = localStorage.getItem("cart");
      const cart = raw ? JSON.parse(raw) : [];
      const existing = cart.find((c) => c.id === id);
      if (existing) {
        existing.quantity = (existing.quantity || 0) + 1;
      } else {
        cart.push({ id, name, price, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    } catch (e) {
      // ignore localStorage errors
      console.error("Failed to add to cart", e);
    }
  }
  return (
    <Card
      className={`relative ${
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
        <Button
          onClick={addToCart}
          variant="link"
          className="gap-2 m-auto cursor-pointer"
        >
          <span className="tracking-[1px] text-[13px] text-black/60 font-bold">
            SHOP
          </span>
          <ChevronRight className="text-orange-400" />
        </Button>
      </CardFooter>
    </Card>
  );
}
