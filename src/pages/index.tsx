import { graphql } from "gatsby";
import React from "react";

export default function BlogPost({ data }) {
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <div>
      {/* <h1>{post.frontmatter.title}</h1> */}
      <div
        dangerouslySetInnerHTML={{
          __html: data?.allMarkdownRemark?.nodes[0].html as string,
        }}
      />
    </div>
  );
}

export const query = graphql`
  query AllMarkdownRemark(
    $filter: MarkdownRemarkFilterInput
    $sort: [MarkdownRemarkSortInput]
    $skip: Int
    $limit: Int
  ) {
    allMarkdownRemark(
      filter: $filter
      sort: $sort
      skip: $skip
      limit: $limit
    ) {
      ...MarkdownRemarkConnectionFields
    }
  }
  fragment MarkdownRemarkConnectionFields on MarkdownRemarkConnection {
    totalCount
    nodes {
      ...MarkdownRemarkFields
    }
    pageInfo {
      ...PageInfoFields
    }
  }

  fragment MarkdownRemarkFields on MarkdownRemark {
    id
    html
    timeToRead
    frontmatter {
      title
    }
  }

  fragment PageInfoFields on PageInfo {
    currentPage
    hasPreviousPage
    hasNextPage
    itemCount
    pageCount
    perPage
    totalCount
  }
`;
