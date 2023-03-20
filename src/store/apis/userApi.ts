
import { UserModel } from "../../Models/UserModel";
import notificationService from "../../services/NotificationService";
import rootApi from "./rootApi";

const userApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query<UserModel[], void>({
      query: () => {
        return {
          url: "users",
          method: "GET",
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userApi.util.updateQueryData(
              "fetchUsers",
              undefined,
              (users: UserModel[]) => {
                users?.push(...result.data);
              }
            )
          );
          
        } catch (error) {
            console.log(error);
          
        }
      }
      
    }),

    addUser: builder.mutation<UserModel, UserModel>({
      query: (user: UserModel) => {
        return {
          url: "users",
          method: "POST",
          body: user,
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userApi.util.updateQueryData(
              "fetchUsers",
              undefined,
              (users: UserModel[]) => {
                users?.push(result.data);
              }
            )
          );
        } catch (error) {
            console.log(error);
            
        }
      },
    }),
    deleteUser: builder.mutation<void, UserModel>({
      query: (user: UserModel) => {
        return {
          url: `users/${user.id}`,
          method: "DELETE",
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            userApi.util.updateQueryData(
              "fetchUsers",
              undefined,
              (users: UserModel[]) => {
                users?.splice(users.findIndex((u) => u.id === args.id), 1);
              }
            )
          );
        } catch (error) {
            notificationService.error(error);
        }
      },
    
    }),
    updateUser: builder.mutation<UserModel, UserModel>({
      query: (user: UserModel) => {
        return {
          url: `users/${user.id}`,
          method: "PUT",
          body: user,
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userApi.util.updateQueryData(
              "fetchUsers",
              undefined,
              (users: UserModel[]) => {
                const index = users.findIndex((u) => u.id === args.id);
                users?.splice(index, 1, result.data);
              }
            )
          );
        } catch (error) {
            notificationService.error(error);
        }
      },
      
    }),
  }),
});


export const { useFetchUsersQuery, useAddUserMutation, useDeleteUserMutation ,useUpdateUserMutation} =
  userApi;
export { userApi };
