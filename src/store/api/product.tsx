import apiMiddleware from './apiMiddleware';
import {ProductTypeApiParams} from './types';

export const productApi = apiMiddleware.injectEndpoints({
  endpoints: builder => ({
    product: builder.query<ProductTypeApiParams, void>({
      query: () => ({
        url: 'products',
        method: 'GET',
      }),
    }),
  }),
});

export const {useLazyProductQuery} = productApi;
