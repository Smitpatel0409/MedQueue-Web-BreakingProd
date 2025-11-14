import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { request } from 'graphql-request';
import { toast } from 'sonner';

type GraphQLVariables = Record<string, unknown>;

type GraphQLRequestArgs<TVariables extends GraphQLVariables = GraphQLVariables> = {
  document: string;
  variables?: TVariables;
};
const graphqlBaseQuery =
  <TVariables extends GraphQLVariables = GraphQLVariables>(): BaseQueryFn<
    GraphQLRequestArgs<TVariables>,
    unknown,
    unknown
  > =>
  async ({ document, variables }) => {
    try {
      const result = await request(
        process.env.NEXT_PUBLIC_GRAPHQL_URL as string,
        document,
        variables
      );
      return { data: result };
    } catch (error) {
      toast.error('GraphQL error: check console');
      console.error('GraphQL error:', error);
      return { error };
    }
  };
export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: graphqlBaseQuery(),
  endpoints: () => ({}),
});
