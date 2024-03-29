import { GatsbyNode } from "gatsby";
import path from "path";

// Add custom fields.slug
// Use file name as slug's value, for nav list
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
  rawMarkdownBody: string;
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
            rawMarkdownBody
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

  // Collect nav data for display
  const navList: {
    route: string;
    name: string;
    target?: string;
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

  // Generate pages
  result.data?.allMarkdownRemark.nodes.forEach((node) => {
    const { fields } = node;

    createPage({
      path: !!fields.slug ? `/${fields.slug}` : "/",
      // Custom pages' template
      component: path.resolve("./src/templates/index.tsx"),
      // pageContext
      context: {
        ...node,
        navList: navList,
        redirect: false,
        route: false,
      },
    });
  });
};

interface CreatePageContext extends MarkdownRemark {
  language: string;
  i18n: {
    language: string;
    languages: string[];
    defaultLanguage: string;
    originalPath: string;
    path: string;
  };
}
