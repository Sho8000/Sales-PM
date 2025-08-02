import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '../lib/prisma';
import { hashCompare } from '@/lib/hashPass';

export const authOptions: NextAuthOptions = {
  session:{
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  providers:[
    CredentialsProvider({
      name:'Email',
      credentials:{
        useremail:{
          label:"Email",
          type: "email",
          placeholder:"yourEmail@example.com"
        },
        password:{
          label:"Password",
          type:"password"
        }
      },
      async authorize(credentials){

        if(!credentials?.useremail || !credentials.password){
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            useremail: credentials.useremail,
          }
        })

        if(!user){
          console.log("No USER", user)
          return null
        }

/*         const hashedPassword = await hashPassword(credentials.password);
        console.log("Password",credentials.password,hashedPassword)
 */
        const isPasswordValid =  await hashCompare(credentials.password,user.password)
        console.log("Password",isPasswordValid)

        if (!isPasswordValid){
          return null
        }

        return {
          id:user.id + "",
          useremail:user.useremail,
          username:user.username,
        }
      }
    })
  ],

  pages: {
    signIn: "/auth"
  },

  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.useremail = token.useremail as string;
        session.user.username = token.username as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.useremail = user.useremail;
        token.username = user.username;
      }
      return token;
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
}
