import { GatsbyNode } from "gatsby";
import path from "path";

interface MarkdownRemark {
  id: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string | null;
    desc: string | null;
    author: string | null;
  };
  html: string;
}

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
    allMarkdownRemark: { nodes: MarkdownRemark[] };
  }>(
    `
      query AllMarkdownRemark {
        allMarkdownRemark {
          nodes {
            id
            frontmatter {
              title
              desc
              author
            }
            html
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

  const navList: {
    route: string;
    name: string;
  }[] = [];
  result.data?.allMarkdownRemark.nodes.forEach((v) => {
    const route = !!v.fields.slug ? v.fields.slug : "/";
    if (route == "/") {
      navList.unshift({
        route: "/",
        name: "home",
      });
    } else {
      navList.push({
        route: `/${v.fields.slug}`,
        name: route,
      });
    }
  });

  result.data?.allMarkdownRemark.nodes.forEach((node) => {
    const { fields } = node;

    createPage({
      path: !!fields.slug ? `/${fields.slug}` : "/",
      component: path.resolve("./src/templates/post.tsx"),
      context: {
        ...node,
        navList: navList,
      },
    });
  });
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark" && node.parent) {
    const fileNode = getNode(node.parent);

    if (fileNode) {
      const name = fileNode.name as string;
      createNodeField({
        node,
        name: "slug",
        value: name == "index" ? "" : `${name}`,
      });
    }
  }
};
