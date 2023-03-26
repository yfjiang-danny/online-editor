import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import React, { useEffect } from "react";
import { FunctionComponent } from "react";

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
}

const MarkdownTemplate: FunctionComponent<MarkdownTemplateProps> = (
  props: MarkdownTemplateProps
) => {
  console.log(props);

  return <MDXProvider components={{}}>{props.data?.mdx.body}</MDXProvider>;
};

export default MarkdownTemplate;

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      id
      fields {
        slug
      }
      body
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        title
        desc
        author
      }
    }
  }
`;
