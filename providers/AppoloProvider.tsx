"use client";
import { ApolloClient, InMemoryCache, ApolloProvider as Provider, createHttpLink } from "@apollo/client";

// Use the correct environment variable
const url = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_AI4ALL_SERVER;

const httpLink = createHttpLink({
    uri: `${url}/graphql`,
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default function ApolloProvider({ children }: { children: React.ReactNode }) {
    return <Provider client={client}>{children}</Provider>;
}