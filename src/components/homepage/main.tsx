"use client";
import * as React from "react";
import { Jumbotron } from "./jumbotron";
import { Benefit } from "./benefit";
import { ProductOffer } from "./offer-product";
import { useSession } from "next-auth/react";

export function HomePage() {
  // const { data: session } = useSession();
  return (
    <>
      <Jumbotron />
      <Benefit />
      <ProductOffer />
    </>
  );
}
