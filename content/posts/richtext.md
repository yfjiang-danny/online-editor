---
title: richtext
date: 2023-03-28T08:46:40.645Z
---
**Richtext test**



**I﻿mage:**

![angry dog](/assets/uploads/angry-dog.jpg "This is a angry dog!")



```typescript
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

```