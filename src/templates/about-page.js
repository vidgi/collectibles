import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import "@google/model-viewer/dist/model-viewer";

// eslint-disable-next-line
export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section section--gradient">
      <div className="container">
      <div className="has-text-weight-light is-size-3">virtualdreamer’s <br></br> time capsule</div>
        {/* <div className="columns"> */}
          {/* <div className="column is-10"> */}
          <div id="card">
            {(typeof window !== 'undefined') ? (
                <model-viewer
                src="/obj1.glb"
                ios-src=""
                alt="obj1"
                shadow-intensity="1"
                camera-controls
                auto-rotate
                ar
              ></model-viewer>
            ) : null}
          </div>
          <div className="has-text-weight-light is-size-6">
            requested November 15, 2021 at 4:52 pm
            <br></br>
            delivered Dec 1st at 11:59 pm
            </div>
          {/* </div> */}
        {/* </div> */}
      </div>
    </section>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
