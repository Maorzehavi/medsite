import { AsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";
import { type } from "os";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  useFetchUsersThunk,
  useDeleteUserThunk,
  useAddUsersThunk,
} from "../store/store";
import UserItem from "./UserItem";

function UsersList() {
  const [runFetchUsers, isLoadingUsers, loadingUsersError] =
    useFetchUsersThunk();
  const [runAddUser, isCreatingUser, creatingUserError] = useAddUsersThunk();
  
  const { users } = useSelector((state: RootState) => state.users);
  useEffect(() => {
    runFetchUsers();
  }, [runFetchUsers]);

  const handelAddUser = () => {
    runAddUser();
  };

  if (isLoadingUsers) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (loadingUsersError) {
    console.log(loadingUsersError);

    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="text-red-500">{loadingUsersError}</div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex flex-row justify-between m-3">
        <h3 className="m-2 text-xl">Users </h3>

        <button onClick={handelAddUser} disabled={isCreatingUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add User
        </button>

        {creatingUserError && (
          <span className="text-red-500">{creatingUserError}</span>
        )}
      </div>
      {users.map((user) => {
        return (
          <UserItem user={user} key={user.id}  />
        );
      })}
    </div>
  );
}

export default UsersList;
