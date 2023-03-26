import { GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";
import path from "path";

interface MdxNode {
  id: string;

  fields: {
    slug: string;
  };
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  const result = await graphql<{
    allMdx: { nodes: MdxNode[] };
  }>(
    `
      query AllMdx {
        allMdx {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  result.data?.allMdx.nodes.forEach((node) => {
    const { id, fields } = node;

    createPage({
      path: !!fields.slug ? fields.slug : "/",
      component: path.resolve("./src/templates/post.tsx"),
      context: node,
    });
  });
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value: path.basename(value, path.extname(value)),
    });
  }
};
