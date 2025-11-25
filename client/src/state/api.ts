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
  tagTypes: ["User", "Properties", "FiltersConfig"],
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

    // =========================================================================
    // PROPERTIES ENDPOINTS
    // =========================================================================

    // Get filters configuration
    getFiltersConfig: build.query<any, void>({
      query: () => "/api/properties/filters",
      providesTags: ["FiltersConfig"],
    }),

    // Search properties
    searchProperties: build.query<any, Record<string, any>>({
      query: (params) => ({
        url: "/api/properties",
        params,
      }),
      providesTags: ["Properties"],
    }),

    // Get property details
    getProperty: build.query<any, string>({
      query: (slugOrId) => `/api/properties/${slugOrId}`,
    }),

    // Get popular properties
    getPopularProperties: build.query<any, { limit?: number; transactionType?: string }>({
      query: (params) => ({
        url: "/api/properties/popular",
        params,
      }),
    }),

    // Get boosted properties
    getBoostedProperties: build.query<any, { limit?: number }>({
      query: (params) => ({
        url: "/api/properties/boosted",
        params,
      }),
    }),

    // Get recent properties
    getRecentProperties: build.query<any, { limit?: number; wilayaId?: string }>({
      query: (params) => ({
        url: "/api/properties/recent",
        params,
      }),
    }),

    // Get communes by wilaya
    getCommunesByWilaya: build.query<any, string>({
      query: (wilayaId) => `/api/properties/communes/${wilayaId}`,
    }),

    // Get similar properties
    getSimilarProperties: build.query<any, { propertyId: string; limit?: number }>({
      query: ({ propertyId, limit }) => ({
        url: `/api/properties/similar/${propertyId}`,
        params: { limit },
      }),
    }),
    }),
});

export const { 
  useGetAuthUserQuery,
  useUpdateUserProfileMutation,
  useUpdateParticulierProfileMutation,
  useUpdateNotificationsMutation,
  useGetFiltersConfigQuery,
  useSearchPropertiesQuery,
  useLazySearchPropertiesQuery,
  useGetPropertyQuery,
  useGetPopularPropertiesQuery,
  useGetBoostedPropertiesQuery,
  useGetRecentPropertiesQuery,
  useGetCommunesByWilayaQuery,
  useGetSimilarPropertiesQuery,
} = api;
