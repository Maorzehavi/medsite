import { AlbumModel } from "../../Models/AlbumModel";
// import { addAlbum, deleteAlbum, fetchAlbums } from "../slices/albumSlice";
import rootApi from "./rootApi";

const albumApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAlbums: builder.query<AlbumModel[], number>({
      providesTags: (result, error, arg) => [{ type: "Album", id: arg }],
      query: (userId) => {
        return {
          url: "albums",
          params: {
            userId: userId,
          },
          method: "GET",
        };
      },
      // async onQueryStarted(args, { queryFulfilled, dispatch }) {
      //   try {
      //     const result = await queryFulfilled;
      //     dispatch(
      //       fetchAlbums(result.data)
      //     );
          
      //   } catch (error) {
      //       console.log(error);
          
      //   }
      // }
    }),

    addAlbum: builder.mutation<AlbumModel, AlbumModel>({
        invalidatesTags: (result, error, arg) => [{ type: "Album", id: arg.userId }],
      query: (album: AlbumModel) => {
        return {
          url: "albums",
          method: "POST",
          body: album,
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;          
          dispatch(
            albumApi.util.updateQueryData('fetchAlbums', args.userId, (albums: AlbumModel[]) => {
                albums?.push(result.data);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deleteAlbum: builder.mutation<void, AlbumModel>({
        invalidatesTags: (result, error, arg) => [{ type: "Album", id: arg.userId }],
        query: (album: AlbumModel) => {
            return {
                url: `albums/${album.id}`,
                method: "DELETE",
            };
        },
        // async onQueryStarted(args, { queryFulfilled, dispatch }) {
        //     try {
        //       dispatch(
        //         deleteAlbum(args)
        //         );
        //         await queryFulfilled;
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        
    })
    
    
  }),
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumApi;
export { albumApi };
