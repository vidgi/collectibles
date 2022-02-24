import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import '@google/model-viewer/dist/model-viewer'

// eslint-disable-next-line
export const AboutPageTemplate = ({ object, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className='section section--gradient'>
      <div className='container'>
        <div className='has-text-weight-light is-size-3'>
          dreamer<br></br>digital gemstone
        </div>
        {/* <div className="columns"> */}
        {/* <div className="column is-10"> */}
        <div id='card'>
          {typeof window !== 'undefined' ? (
            <model-viewer
              src={object}
              ios-src=''
              alt={object}
              shadow-intensity='1'
              camera-controls
              auto-rotate
              ar
            ></model-viewer>
          ) : null}
        </div>
        <div className='has-text-weight-light is-size-6'>
          (description of object)
          <br></br>
          (other details)
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </section>
  )
}

AboutPageTemplate.propTypes = {
  object: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        object={post.frontmatter.object}
        content={post.html}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        object
      }
    }
  }
`
