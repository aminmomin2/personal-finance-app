import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { prisma } from "./lib/prisma"
import { JWT } from "next-auth/jwt"

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      email?: string | null
      provider?: string
    }
  }
  
  interface User {
    provider?: string
  }
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
  interface JWT {
    provider?: string
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    async profile(profile) {
      return {
        id: profile.sub,
        email: profile.email,
        provider: "google"
      }
    }
  }), Credentials({
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
        provider: "credentials"
      }
    },
  })],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email as string },
          })

          if (!existingUser) {
            // Create new user if doesn't exist
            await prisma.user.create({
              data: {
                email: user.email as string,
                provider: "google",
                passwordHash: "", // Empty string since Google auth doesn't use password
              },
            })
          }
          // If user exists, allow sign in regardless of provider
          return true
        } catch (error) {
          return false
        }
      }
      return true
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.provider = token.provider as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.provider = user.provider
      }
      return token
    }
  },
  pages: {
    signIn: "/login"
  }
})