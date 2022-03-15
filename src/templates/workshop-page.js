import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import '@google/model-viewer/dist/model-viewer'

import {Card, CardContent} from '@mui/material';
import TypeAnimation from 'react-type-animation';

// eslint-disable-next-line
export const WorkshopPageTemplate = ({ object, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className='section section--gradient'>
      <div className='container content'>
      <div className='section'>
        <div className='has-text-weight-normal is-size-4'>
          <TypeAnimation
                    cursor={true}
                    sequence={['', 500, 'workshop']}
                    className="has-text-weight-normal is-size-3"
                  />
        </div>
        <br></br>
        <div className='has-text-weight-normal is-size-6'>
        <PageContent className="content" content={content} />
        </div>

     <div id='card' style={{ backgroundColor:"#dbd9c3"}}>
            {typeof window !== 'undefined' ? (
              <model-viewer
                id="reveal" 
                loading="eager"
                src={'/assets/wildflowers/texas-bluebonnet.glb'}
                ios-src=''
                alt={'Texas Bluebonnet'}
                poster={'/assets/wildflowers/texas-bluebonnet.png'}
                shadow-intensity='1'
                camera-orbit={'255.9deg 62.99deg auto'}
                camera-controls
                auto-rotate
                ar
              ></model-viewer>
            ) : null}
          </div>   

          <div id='card' style={{ backgroundColor:"#dbd9c3"}}>
            {typeof window !== 'undefined' ? (
              <model-viewer
                id="reveal" 
                loading="eager"
                src={'/assets/giraffes/coconut-spring.glb'}
                ios-src=''
                alt={'Coconut Spring'}
                poster={'/assets/giraffes/coconut-spring.png'}
                shadow-intensity='1'
                camera-orbit={'-307.2deg 68.23deg auto'}
                camera-controls
                auto-rotate
                ar
              ></model-viewer>
            ) : null}
          </div>   


        </div>
        {/* </div> */}
      </div>
    </section>
  )
}

WorkshopPageTemplate.propTypes = {
  object: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
}

const WorkshopPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <WorkshopPageTemplate
        contentComponent={HTMLContent}
        object={post.frontmatter.object}
        content={post.html}
      />
    </Layout>
  )
}

WorkshopPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default WorkshopPage

export const workshopPageQuery = graphql`
  query WorkshopPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        object
      }
    }
  }
`
