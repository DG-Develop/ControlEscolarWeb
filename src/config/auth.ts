import { axiosInstance } from "./axios-instance";
import { AuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "username", type: "email", placeholder: "escribe tu correo" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log(`${process.env.API_URL}/Usuario/login`)
        try {
          const { data: respuesta, status } = await axiosInstance.post<any>(
            `${process.env.API_URL}/Usuario/login`,
            {
              correoElectronico: credentials.email,
              password: credentials.password
            }
          )

          console.log(respuesta)

          if (status !== 200 || !respuesta) {
            throw respuesta
          }

          return respuesta.resultado;

        } catch (error) {

          if (error.response) {
            // La respuesta fue hecha y el servidor respondió con un código de estado
            // que esta fuera del rango de 2xx
            throw error.response.data
          } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
            // http.ClientRequest en node.js
            throw error.request
          } else {
            // Algo paso al preparar la petición que lanzo un Error
            throw new Error(error.message)
          }

        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 4 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    }
  }
}