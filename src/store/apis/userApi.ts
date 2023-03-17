import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserModel } from "../../Models/UserModel";
import appConfig from "../../utils/config";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: appConfig.apiBaseUrl }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    fetchUsers: builder.query<UserModel[], void>({
      providesTags: ["User"],
      query: () => {
        return {
          url: "users",
          method: "GET",
        };
      },
    }),

    addUser: builder.mutation<UserModel, UserModel>({
      invalidatesTags: ["User"],
      query: (user: UserModel) => {
        return {
          url: "users",
          method: "POST",
          body: user,
        };
      },
    }),
  }),
});

export const { useFetchUsersQuery, useAddUserMutation } = userApi;
export { userApi };
