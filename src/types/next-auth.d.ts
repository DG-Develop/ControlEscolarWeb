import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            username: string,
            role: string,
            accessToken: string,
        }
    }
}