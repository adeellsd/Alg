import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import type { User } from "@/types/prismaTypes";
import { createNewUserInDatabase } from "@/lib/utils";

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
  tagTypes: ["User"],
  endpoints: (build) => ({
    getAuthUser: build.query<AuthUserResponse, void>({
        providesTags: ["User"],
        queryFn: async (_, _queryApi, _extractOptions, fetchWithBQ) => {
          try {
            const session = await fetchAuthSession();
            const {idToken} = session.tokens ?? {};
            const user = await getCurrentUser();

            // Cognito role is only used for initial user creation flow
            const cognitoRole = idToken?.payload["custom:role"] as string;

            // Try to fetch user from database first to get real accountTier
            // Backend AuthMiddleware will verify JWT and determine actual tier from DB
            const cognitoId = user.userId;
            
            // Try pro endpoint first (covers STARTER, PRO, ELITE)
            let userDetailsResponse = await fetchWithBQ(`/pro/${cognitoId}`);
            
            // If not found, try particulier endpoint (covers FREE tier)
            if (userDetailsResponse.error && userDetailsResponse.error.status === 404) {
              userDetailsResponse = await fetchWithBQ(`/particulier/${cognitoId}`);
            }

            // If still not found, create new user in database
            if (userDetailsResponse.error && userDetailsResponse.error.status === 404) {
              userDetailsResponse = await createNewUserInDatabase(
                user,
                idToken,
                cognitoRole,
                fetchWithBQ
              );
            }

            const userInfo = userDetailsResponse.data as User;

            return {
              data: {
                cognitoInfo: { ...user},
                userInfo,
                // Use accountTier from database as source of truth
                userRole: userInfo.accountTier
              }
            };
          } catch (error: any) {
              return { error: error.message || "Failed to fetch user data" };
          }
        },
      }),
    
    // Update user profile
    updateUserProfile: build.mutation<User, { 
      cognitoId: string; 
      data: Partial<User> 
    }>({
      query: ({ cognitoId, data }) => ({
        url: `/pro/${cognitoId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Update particulier profile
    updateParticulierProfile: build.mutation<User, { 
      cognitoId: string; 
      data: Partial<User> 
    }>({
      query: ({ cognitoId, data }) => ({
        url: `/particulier/${cognitoId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Update notifications preferences
    updateNotifications: build.mutation<User, { 
      cognitoId: string; 
      emailNotifications?: boolean;
      smsNotifications?: boolean;
      pushNotifications?: boolean;
    }>({
      query: ({ cognitoId, ...prefs }) => ({
        url: `/pro/${cognitoId}`,
        method: "PUT",
        body: prefs,
      }),
      invalidatesTags: ["User"],
    }),
    }),
});

export const { 
  useGetAuthUserQuery,
  useUpdateUserProfileMutation,
  useUpdateParticulierProfileMutation,
  useUpdateNotificationsMutation,
} = api;
