import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.GRAPHQL_URL,
  documents: `${__dirname}/src/graphql/*.graphql`,
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/generated/graphql.tsx": {
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
      config: {
        // gqlImport: `gatsby#graphql`,
      },
    },
  },
};

export default config;
