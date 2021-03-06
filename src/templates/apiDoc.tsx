import React from "react";
import { graphql } from "gatsby";

import BasePage from "~src/components/basePage";
import SmartLink from "~src/components/smartLink";
import ApiSidebar from "~src/components/apiSidebar";
import Content from "~src/components/content"

export default props => {
  const {
    data: { allOpenApi, apiDescription },
  } = props;
  return (
    <BasePage sidebar={<ApiSidebar />} {...props}>
      {apiDescription && <Content file={apiDescription} />}
      <ul data-noindex>
        {allOpenApi.edges.map(({ node: { path } }) => (
          <li
            key={path.operationId}
            style={{
              marginBottom: "1rem",
            }}
          >
            <h4>
              <SmartLink to={path.readableUrl}>{path.operationId}</SmartLink>
            </h4>
          </li>
        ))}
      </ul>
    </BasePage>
  );
};

export const pageQuery = graphql`
  query OpenApiDocQuery($tag: [String]) {
    allOpenApi(
      filter: { path: { tags: { in: $tag } } }
      sort: { fields: path___operationId }
    ) {
      edges {
        node {
          id
          path {
            operationId
            readableUrl
          }
        }
      }
    }
    apiDescription(name: {in: $tag}) {
      childMdx {
        body
      }
    }
  }
`;
