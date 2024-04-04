// apiSlice.js
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  fetchFn: (...args) => {
    console.log("Making request with args:", args); // Log the request arguments
    return fetch(...args, { credentials: "include" }); // Include cookies
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Category"],
  endpoints: (builder) => ({}),
});
