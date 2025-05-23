import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import prisma from "./lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Credentials({
    credentials: {
      email: {
        type: "email",
        label: "Email"
      },
      password: {
        type: "password",
        label: "Password"
      }
    },
    authorize: async (credentials) => {
      if (!credentials?.email || !credentials.password) {
        return null
      }
      // 1. Lookup user in your database
      const user = await prisma.user.findUnique({
        where: { email: credentials.email as string },
      })
      if (!user) {
        // No user found
        return null
      }
      // 2. Compare supplied password to stored hash
      const isValid = await bcrypt.compare(
        credentials.password as string,
        user.passwordHash
      )
      if (!isValid) {
        // Wrong password
        return null
      }
      // 3. Return a minimal user object for the session
      return {
        id: user.id.toString(),
        email: user.email,
      }
    },
  })],
  pages: {
    signIn: "/login"
  }
})