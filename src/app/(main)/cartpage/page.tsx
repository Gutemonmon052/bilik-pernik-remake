"use client";
import { Cart } from "@/components/cart/main";
import * as React from "react";
import { useSession } from "next-auth/react";
import { SessionLogin } from "@/components/session-login";
export interface IAppProps {}

export default function CartPage() {
  const { data: session } = useSession();
  return (
    <>
      {session?.user ? (
        <Cart />
      ) : (
        <>
          <SessionLogin />
        </>
      )}
    </>
  );
}
