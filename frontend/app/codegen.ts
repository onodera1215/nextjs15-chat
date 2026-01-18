import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://backend:3000/graphql/",
  documents: ["**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./graphql/": {
      preset: "client",
      config: {
        documentMode: "string",
      },
    },
    "./graphql/schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;
