import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { UserModel } from "../../Models/UserModel";
import appConfig from "../../utils/config";
import { AppDispatch } from "../store";

const url = appConfig.apiBaseUrl + "users";

const fetchUsers = createAsyncThunk("users/fetch", async ():Promise<UserModel[]> => {
  const response = await axios.get<UserModel[]>(url);
  return response.data;
});

const addUser = createAsyncThunk("users/add", async ():Promise<UserModel> => {
  const response = await axios.post<UserModel>(url, {
    name: faker.name.firstName()
  });
  return response.data;
});

const deleteUser = createAsyncThunk("users/delete", async (user:UserModel):Promise<void> => {
  await axios.delete(url + `/${user.id}`);
});

export function useFetchUsersThunk( ) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  const runThunk = useCallback(()=> {
    setIsLoading(true);
    dispatch(fetchUsers())
      .unwrap()
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [dispatch, fetchUsers]);
  return [runThunk, isLoading, error];
}
export function useAddUsersThunk( ) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  const runThunk = useCallback(() => {
    setIsLoading(true);
    dispatch(addUser())
      .unwrap()
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [dispatch, addUser]);
  return [runThunk, isLoading, error];
}



export function useDeleteUserThunk( ) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  const runThunk = useCallback(
    (user :UserModel) => {
      setIsLoading(true);
      dispatch(deleteUser(user))
        .unwrap()
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
    },
    [dispatch, deleteUser]
  );
  return [runThunk, isLoading, error];
}



export { fetchUsers, addUser, deleteUser };
