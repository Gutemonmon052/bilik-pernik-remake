"use client";
import * as React from "react";
import { Jumbotron } from "./jumbotron";
import { Benefit } from "./benefit";
import { ProductOffer } from "./offer-product";

export function HomePage() {
 
  return (
    <>
      <Jumbotron />
      <Benefit />
      <ProductOffer />
    </>
  );
}
