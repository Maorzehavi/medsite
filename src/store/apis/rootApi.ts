import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import appConfig from "../../utils/config";

const rootApi = createApi({
  reducerPath: "rootApi",
  tagTypes: ["Album"],
  baseQuery: fetchBaseQuery({ baseUrl: appConfig.apiBaseUrl }),
  endpoints: (builder) => ({}),
});


export default rootApi;
