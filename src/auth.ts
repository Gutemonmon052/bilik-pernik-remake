import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { User } from "next-auth";

interface CustomUser extends User {
  authToken?: string;
  details: {
    id:number;
    created_at:number;
    email: string;
    username: string;
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 3, // 3 jam
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const response = await fetch(
            "https://x8ki-letl-twmt.n7.xano.io/api:5v6_rKI6/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

          if (!data.authToken) {
            throw new Error("Email atau password salah.");
          }else{
            return data;
          }
          // Xano biasanya mengembalikan token dan detail pengguna
          // if (!data.length) throw new Error("User not found");
          // const user = data[0];
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && 'authToken' in user) {
        token.id = user.id;
        token.username = user.name;
        token.email = user.email;
        token.authToken = user.authToken;
      }
    
      if (token.authToken) {
        try {
          const response = await fetch(
            "https://x8ki-letl-twmt.n7.xano.io/api:5v6_rKI6/auth/me",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token.authToken}`,
              },
            }
          );
    
          // if (!response.ok) {
          //   throw new Error("Gagal mendapatkan data pengguna.");
          // }
    
          const userData = await response.json();
          token.userData = userData; // Simpan data pengguna
          console.log(userData);
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      }
    
      return token;
    },
    

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name,
          email: token.email as string,
          authToken: token.authToken,
          details: token.userData,
        } as any;
      }
      return session;
    },
    
    async signIn({ account, profile }) {
      if (account && account.provider === "google") {
        console.log(profile)
        return Promise.resolve(profile?.email_verified === true);
      }
      return Promise.resolve(true);
    },
  },
});

