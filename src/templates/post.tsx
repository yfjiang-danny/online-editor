import { MDXProvider } from "@mdx-js/react";
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
  return (
    <MDXProvider components={{}}>
      <div dangerouslySetInnerHTML={{ __html: props.pageContext.html }} />
    </MDXProvider>
  );
};

export default MarkdownTemplate;
