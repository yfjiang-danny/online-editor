---
title: guide
author: danny
date: 2023-03-28T01:45:02.139Z
---

# Guide

## Install gatsby

```bash
npm install gatsby-cli --global
```

_Tip:Gatsby may require nodejs>18.0.0, make sure the version of node matches；It is recommended to use [nvm](https://github.com/nvm-sh/nvm) to manage nodejs version_

## Markdown Display

1. Create a gatsby project

   ```bash
   npm init gatsby
   ```

   progress:

   > Input site name: online editor
   > Input github repo: github/online-editor
   > Check Typescript
   > Check Netlify CMS
   > Check styled-component
   > Check all except 'Add markdown support(without MDX)'

2. Use `gatsby-plugin-layout` && `createPage` to create dynamic page

   1. Install plugin

      ```bash
      npm install gatsby-plugin-layout
      ```

   2. Add a layout component `./src/components/layout/index.tsx`

      ```tsx
      // pageContext depend on createPage that is called in gatsby-node.ts
      export default function Layout({ children, pageContext }) {
        // Customize component
        return <div>{children}</div>;
      }
      ```

   3. Add plugin in `gatsby-config.ts`

      ```typescript
      import path from "path";
      const config: GatsbyConfig = {
        // ...
        plugins: [
          //...
          {
            resolve: `gatsby-plugin-layout`,
            options: {
              // Custom layout component by step 2
              component: path.resolve(`./src/components/layout/index.tsx`),
            },
          },
          // ...
        ],
      };
      ```

   4. Add custom fields on graphql `gatsby-node.ts`

      ```typescript
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
      ```

   5. Define `createPages` in `gatsby-node.ts` to generate dynamic page.

      ```typescript
      export const createPages: GatsbyNode["createPages"] = async ({
        graphql,
        actions,
      }) => {
        const { createPage } = actions;

        // Query all markdown
        const result = await graphql`
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
        `;

        if (result.errors) {
          throw result.errors;
        }

        // Collect data for nav display
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
            component: path.resolve("./src/templates/post.tsx"),
            // pageContext
            context: {
              ...node,
              navList: navList,
            },
          });
        });
      };
      ```

   6. Create page template `./src/templates/post.tsx`

      ```tsx
      interface MarkdownTemplateProps {
        data?: {
          mdx: MdxNode;
        };
        pageContext: PageContext;
      }

      const MarkdownTemplate: FunctionComponent<MarkdownTemplateProps> = (
        props: MarkdownTemplateProps
      ) => {
        return (
          <MDXProvider components={{}}>
            <div dangerouslySetInnerHTML={{ __html: props.pageContext.html }} />
          </MDXProvider>
        );
      };
      ```

3. Create `content/posts/index.md`

   ```md
   # This is a markdown
   ```

4. Delete `src/pages` and run `npm start`. Finished md display.

## Netlify

1. Add `src/cms/cms.ts`. Init netlify cms.

   ```typescript
   import CMS from "netlify-cms-app";
   import cloudinary from "netlify-cms-media-library-cloudinary";
   import uploadcare from "netlify-cms-media-library-uploadcare";

   CMS.registerMediaLibrary(uploadcare);
   CMS.registerMediaLibrary(cloudinary);

   CMS.init();
   ```

2. Add `static/admin/config.yml`

   ```yml
   backend:
   name: git-gateway
   repo: ${GATSBY_NETLIFY_REPO} # your GitHub username and repository name
   branch: main
   base_url: /admin
   # api_root: https://gitlab.com/api/v4

   # This line should *not* be indented
   publish_mode: editorial_workflow

   # Media files will be stored in the repo under images/uploads
   media_folder: "static/assets/uploads"
   # The src attribute for uploaded media will begin with /images/uploads
   public_folder: "/assets/uploads"

   collections:
   - name: "index" # Used in routes, e.g., /admin/collections/blog
       label: "Posts" # Used in the UI
       folder: "content/posts" # The path to the folder where the documents are stored
       create: true # Allow users to create new documents in this collection
       slug: "{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
       fields: # The fields for each document, usually in front matter
       - { name: "title", label: "Title" }
       - { name: "date", label: "Date", widget: "datetime" }
       - { name: "body", label: "body", widget: "markdown" }
   ```

3. Enable environment variables

   1. Add code to `gatsby-config.ts`

      ```typescript
      import dotenv from "dotenv";

      dotenv.config({
        path: `.env`,
      });
      // ...
      ```

   2. Create `.env`

      ```env
      GATSBY_NETLIFY_REPO=xxx
      ```

4. Deploy to netlify
   1. Login in with github
   2. Create site with `import an existing project` [netlify](https://app.netlify.com/start) step by step.
   3. [Integration guide](https://docs.netlify.com/integrations/frameworks/gatsby/#app)

### Q&A

1. Netlify Node version setting: `Site settings > Environment variables > Add a variable` add `NODE_VERSION` `x.x.x`(example: 18.15.0)
2. Netlify Identity
   1. `Site settings > Identity > Registration` > `Invite only`
   2. `Integrations > Identity` > `view` > `Invite users`
   3. `Site settings > Identity > Services` > github auth
