import * as React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;

    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `collections > ${tag}`;

    const postLinks = posts.map((post) => (
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
        <img
        src={post.node.frontmatter.featuredimage}
        objectFit={"cover"}
        style={{ height: 250, width: '100%',}}
        alt={post.node.frontmatter.title}
        />
        <h2 className="has-text-weight-normal is-size-6">{post.node.frontmatter.title}</h2>
        </Link>
      </li>
    ));
   
    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10"
                style={{ marginBottom: "6rem" }}
              >
                <div className='has-text-weight-normal is-size-4'>
                  {tagHeader}
                </div>
                <ul className="taglist">{postLinks}</ul>
                <div className='has-text-weight-normal is-size-4'>
                  <Link to="/collections/">view all collections</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___title], order: ASC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            featuredimage
            filename
          }
        }
      }
    }
  }
`;
