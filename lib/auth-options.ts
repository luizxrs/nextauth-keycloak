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
          // Any object returned will be saved in `user` property of the JWT
          console.log(user);
          return user;
        } else {
          // Return an object that will pass error information through to the client-side.
          throw new Error(
            JSON.stringify({
              errors: user.error,
              error_description: user.error_description,
              status: false,
            }),
          );
        }
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
      console.log(session);
      console.log(token);
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
