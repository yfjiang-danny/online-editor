import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import React, { FunctionComponent } from "react";
import { NavItemModel } from "../components/nav";

export type PageContext = MarkdownRemark & {
  navList: NavItemModel[];
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
  body: string;
  parent: {
    relativePath: string;
  };
}

interface MarkdownTemplateProps {
  data?: {
    mdx: MdxNode;
  };
  pageContext: PageContext;
}

const MarkdownTemplate: FunctionComponent<MarkdownTemplateProps> = (
  props: MarkdownTemplateProps
) => {
  console.log("props", props);

  return (
    <MDXProvider components={{}}>
      <div dangerouslySetInnerHTML={{ __html: props.pageContext.html }} />
    </MDXProvider>
  );
};

export default MarkdownTemplate;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
