import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api-us-east-1.graphcms.com/v2/ckko4i0rhrxxt01xocc9q9s9i/master',
  cache: new InMemoryCache()
});