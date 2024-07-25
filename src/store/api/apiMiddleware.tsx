import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
const baseUrl = 'https://5fc9346b2af77700165ae514.mockapi.io/';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: headers => {
    headers.set('Accept', 'application/json');
    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  let result = await baseQuery(args, api, extraOptions);

  return result;
};

const apiMiddleware = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: '',
  keepUnusedDataFor: 0,
  tagTypes: ['User'],

  endpoints: () => ({}),
});

export default apiMiddleware;
