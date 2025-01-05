'use client';
import { Registers } from "@/components/register/main";
import * as React from "react";
import { useSession } from "next-auth/react";
import { SessionActive } from "@/components/session-active";

export default function Register() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? (
        <>
          <SessionActive />
        </>
      ) : (
        <Registers />
      )}
    </>
  );
}
