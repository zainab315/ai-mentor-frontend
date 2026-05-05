"use client";
import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from "@apollo/client";
const url = process.env.NEXT_PUBLIC_AI4ALL_SERVER
const client = new ApolloClient({
    uri: `${url}graphql`,
    cache: new InMemoryCache(),
});

export  function ApolloProvider({ children }: { children: React.ReactNode }) {
    return <Provider client={client}>{children}</Provider>;
}