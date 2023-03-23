import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
} from "urql";

const urqlClient = createClient({
  url: `${process.env.GRAPHQL_URL}`,
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
  // every operation will by default use cache-and-network rather
  // than cache-first now:
  requestPolicy: "cache-and-network",
});

export { urqlClient };
