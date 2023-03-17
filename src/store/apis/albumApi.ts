import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AlbumModel } from "../../Models/AlbumModel";
import { UserModel } from "../../Models/UserModel";
import appConfig from "../../utils/config";

const albumApi = createApi({
  reducerPath: "albumApi",
  baseQuery: fetchBaseQuery({ baseUrl: appConfig.apiBaseUrl }),
  tagTypes: ["Album"],
  endpoints: (builder) => ({
    fetchAlbums: builder.query<AlbumModel[], UserModel>({
      providesTags: (result, error, arg) => [{ type: "Album", id: arg.id }],
      query: (user:UserModel) => {
        return {
          url: "albums",
          params: {
            userId: user.id,
          },
          method: "GET",
        };
      },
    }),

    addAlbum: builder.mutation<AlbumModel, AlbumModel>({
      invalidatesTags: (result, error, arg) => [{ type: "Album", id: arg.userId }],
      query: (album:AlbumModel) => {
        return {
          url: "albums",
          method: "POST",
          body: album,
        };
      },
    }),
  }),
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumApi;
export { albumApi };
