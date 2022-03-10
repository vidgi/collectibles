import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import '@google/model-viewer/dist/model-viewer'

import {Card, CardContent} from '@mui/material';

// eslint-disable-next-line
export const AboutPageTemplate = ({ object, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className='section section--gradient'>
      <div className='container content'>
      <div className='section'>
      {/* <Card style={{ justifyContent: "center", padding:'1em' }}> */}
          {/* <CardContent> */}
        <div className='has-text-weight-normal is-size-4'>
          about
        </div>
        <br></br>
        <div className='has-text-weight-normal is-size-6'>
        <PageContent className="content" content={content} />
        </div>
        {/* </CardContent> */}
          {/* </Card> */}
        </div>
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
