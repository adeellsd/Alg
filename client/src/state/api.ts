import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import type { User } from "@/types/prismaTypes";

// Interface pour la réponse de getAuthUser
interface AuthUserResponse {
  cognitoInfo: any;
  userInfo: User;
  userRole: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {

      const session = await fetchAuthSession();
      const {idToken} = session.tokens ?? {};
      if (idToken) {
        headers.set("Authorization", `Bearer ${idToken}`);
      }
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (build) => ({
    getAuthUser: build.query<AuthUserResponse, void>({
        queryFn: async (_, _queryApi, _extractOptions, fetchWithBQ) => {
          try {
            const session = await fetchAuthSession(); // Assume this function fetches the current auth session

            const {idToken} = session.tokens ?? {};

            const user = await getCurrentUser(); // Assume this function fetches the current user details

            const userRole = idToken?.payload["custom:role"] as string;

            const endpoint =
              userRole === "Pro" ?
                `/pro/${user.userId}` : `/particulier/${user.userId}`;

              let userDetailsResponse = await fetchWithBQ(endpoint);  

              // If user doesn't exist, create them

              return {
                data: {
                  cognitoInfo: { ...user},
                  userInfo: userDetailsResponse.data as User,
                  userRole
                }
              };
          } catch (error: any) {
              return { error: error.message || "Failed to fetch user data" };
          }
        },
      }),
    }),
});

export const { useGetAuthUserQuery } = api;
