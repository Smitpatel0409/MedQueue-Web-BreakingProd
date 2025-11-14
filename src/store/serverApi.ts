'use client';

import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'sonner'; // ✅ Sonner toast

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL + '/api',
});

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && isFetchBaseQueryError(result.error)) {
      const status = result.error.status;

      if (status === 404) {
        toast.error('404 - Not Found: The requested resource does not exist.');
      }

      if (status === 401 || status === 500) {
        toast.error('Unauthorized or Server Error. Please login again.');
        localStorage.clear(); // optional: clear token/session
      }
    }

    return result;
  } catch {
    toast.error('Network error: Failed to reach the server. Try again later.');
    return {
      error: {
        status: 'FETCH_ERROR',
        error: 'An error occurred while fetching data',
      },
    };
  }
};

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
