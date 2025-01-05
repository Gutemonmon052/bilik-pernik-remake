"use client";
import { Login } from "@/components/login/main";
import * as React from "react";
import { useSession } from "next-auth/react";
import { SessionActive } from "@/components/session-active";

export default function login({}) {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user ? (
        <>
          <SessionActive />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
