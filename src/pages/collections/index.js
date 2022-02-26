import * as React from "react";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`collections | ${title}`} />
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10"
            style={{ marginBottom: "6rem" }}
          >
            <div className="has-text-weight-normal is-size-4">
              collections
            </div>
            <ul className="taglist">
              {group.map((tag) => (
                <li key={tag.fieldValue}>
                  <Link to={`/collections/${kebabCase(tag.fieldValue)}/`}>
                  <img
                    src={`/assets/collections/${tag.fieldValue}.png`}
                    objectFit={"cover"}
                    style={{ height: 250, width: '100%',}}
                    alt={tag.fieldValue}
                    />
                    <h2 className="has-text-weight-normal is-size-6">{tag.fieldValue} ({tag.totalCount})</h2>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default TagsPage;

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
