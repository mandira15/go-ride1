import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await connectDB()
          
          const user = await User.findOne({ email: credentials.email })
          if (!user) {
            throw new Error('No user found')
          }

          const isPasswordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordMatch) {
            throw new Error('Invalid password')
          }

          return {
            id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType,
          }
        } catch (error) {
          throw new Error(error.message)
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.userType = token.userType
        session.user.id = token.id
      }
      return session
    }
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt'
  }
})

export { handler as GET, handler as POST }