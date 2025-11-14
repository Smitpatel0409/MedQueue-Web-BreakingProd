import { serverApi } from '@/store/serverApi';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

type UsersResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

export const userApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () => ({
        url: 'https://dummyjson.com/users', // ideally use env var here
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery } = userApi;
