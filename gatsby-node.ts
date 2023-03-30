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

// export const onCreatePage: GatsbyNode["onCreatePage"] = async ({
//   page,
//   actions,
// }) => {
//   const { createPage, deletePage } = actions;

//   // Only create one 404 page at /404.html
//   if (page.path.includes("404")) {
//     return;
//   }

//   // First delete the incoming page that was automatically created by Gatsby
//   // So everything in src/pages/ still runs.
//   deletePage(page);

//   const pageContext = page.context as unknown as CreatePageContext;
//   console.log("pageContext", pageContext);

//   // Grab the keys ('en' & 'de') of your translation files
//   const availableLanguages = (pageContext.i18n.languages || []) as string[];

//   // Remove the leading/trailing slashes from the page path, e.g. => home, about, blog/my-awesome-blog
//   const pageName = page.path === "/" ? "home" : page.path;

//   // Generate a new page for each available language
//   availableLanguages.forEach((language) => {
//     // Combine the pageName with the language-specific file naming convention, e.g. => home/index.en.js
//     const lang = language ?? pageContext.i18n.defaultLanguage;

//     createPage({
//       // The new url (e.g. /blog/my-awesome-blog)
//       path: `/${lang}/${pageName}`,
//       // Use the original page component for each new page
//       component: page.component,
//       // Pass down additional context, if necessary
//       context: {
//         ...pageContext,
//         locale: lang,
//         routed: false,
//         originalPath: page.path,
//       },
//     });
//   });
// };
