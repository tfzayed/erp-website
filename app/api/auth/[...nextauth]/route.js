import Axios from "@/lib/axios";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;

      const AllUser = await Axios.get("user", {
        params: {
          email: user.email,
        },
      });
      const users = AllUser.data.result;

      if (users.map((el) => el.email).includes(user.email)) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthoriced'
      }
    },
    async jwt({ token }) {
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.id = token.id;
      }

      const userData = await Axios.get("user", {
        params: {
          email: session.user.email,
        },
      });
      const users = userData.data.result;

      const Admins = users.filter((user) => user.role === "admin");

      const sessionData = {
        ...session,
        admin: Admins.map((data) => data.email).includes(session.user.email),
      };

      token.isAdmin = Admins.map((data) => data.email).includes(
        session.user.email
      );

      return { token, sessionData };
    },
  },

  theme: {
    colorScheme: "light",
  },
};
process.env.NODE_ENV !== "production";

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
