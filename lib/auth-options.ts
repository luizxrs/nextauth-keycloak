import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

const KEYCLOAK_CLIENT_ID = "eobra_front";
const KEYCLOAK_CLIENT_SECRET = "3vadgLZJCc38BRZd4gZci6oPn6EVJu0t";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials) {
        const url =
          "https://iam.inover.app.br/auth/realms/Inover/protocol/openid-connect/token";

        const formData = new URLSearchParams();
        formData.append("client_id", KEYCLOAK_CLIENT_ID);
        formData.append("grant_type", "password");
        formData.append("client_secret", KEYCLOAK_CLIENT_SECRET);
        formData.append("username", credentials?.email ?? "");
        formData.append("password", credentials?.password ?? "");
        formData.append("scope", "openid");

        const res = await fetch(url, {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        const user = await res.json();
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, {
          access_token: account.access_token,
        });
      }
      return token;
    },
    session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          access_token: token.access_token,
          user: {
            ...session.user,
            // inserts the user id into the session
            id: token.sub,
          },
        });
      }
      return session;
    },
  },
};
