// import { NextAuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import CredentialProvider from "next-auth/providers/credentials";
// import KeycloakProvider from "next-auth/providers/keycloak";

// const KEYCLOAK_CLIENT_ID = "eobra_front";
// const KEYCLOAK_CLIENT_SECRET = "3vadgLZJCc38BRZd4gZci6oPn6EVJu0t";
// const KEYCLOAK_URL = "https://iam.inover.app.br/auth";
// const KEYCLOAK_REALM = "Inover";

// const KEYCLOAK_ISSUER = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}`;

// export const authOptions: NextAuthOptions = {
//   providers: [
//     KeycloakProvider({
//       clientId: KEYCLOAK_CLIENT_ID,
//       clientSecret: KEYCLOAK_CLIENT_SECRET,
//       issuer: KEYCLOAK_ISSUER,

//       profile(
//         profile: {
//           email: string;
//           name?: string;
//           picture: string;
//           preferred_username: string;
//           sub: string;
//         },
//         token,
//       ) {
//         console.log({ profile, token });

//         return {
//           token: token.access_token,
//           // -- Below Are required and standard return fields in the library
//           id: profile.sub,
//           name: profile.name ?? profile.preferred_username,
//           email: profile.email,
//           picture: profile.picture,
//         };
//       },

//       client: {
//         authorization_signed_response_alg: "PS256",
//         id_token_signed_response_alg: "PS256",
//       },
//     }),
//     CredentialProvider({
//       credentials: {
//         email: {
//           label: "email",
//           type: "email",
//           placeholder: "example@gmail.com",
//         },
//         password: {
//           label: "password",
//           type: "password",
//           placeholder: "******",
//         },
//       },
//       async authorize(credentials, req) {
//         const user = { id: "1", name: "John", email: credentials?.email };
//         if (user) {
//           // Any object returned will be saved in `user` property of the JWT
//           return user;
//         } else {
//           // If you return null then an error will be displayed advising the user to check their details.
//           return null;

//           // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/", //sigin page
//   },
// };
