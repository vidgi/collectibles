import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import '@google/model-viewer/dist/model-viewer'
import {Card, CardContent} from '@mui/material'

// eslint-disable-next-line
export const BlogPostTemplate = ({
  content,
  contentComponent,
  filename,
  featuredimage,
  initialposition,
  description,
  tags,
  title,
  helmet
}) => {
  const PostContent = contentComponent || Content

  return (
      <section className='section2 container content'>
        {helmet || ''}
        {/* <div className='container content'> */}
        {tags && tags.length ? (
              <div style={{ marginTop: `0rem` }}>
                {/* <h4>collection</h4> */}
                <ul className='taglist'>
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/collections/`}>collections </Link> > <Link to={`/collections/${kebabCase(tag)}/`}>{tag}</Link> > {title}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <Card style={{ justifyContent: "center", padding:30}}>
          <CardContent>
          <div className='has-text-weight-normal is-size-3'>
            {title}
          </div>
          {/* <div className="columns"> */}
          {/* <div className="column is-10"> */}
          <div id='card'>
            {typeof window !== 'undefined' ? (
              <model-viewer
                id="reveal" 
                loading="eager"
                src={filename}
                ios-src=''
                alt={title}
                poster={featuredimage}
                shadow-intensity='1'
                camera-controls
                auto-rotate
                ar
                camera-orbit={initialposition}
              ></model-viewer>
            ) : null}
          </div>

          

          <div className='has-text-weight-normal is-size-4'>
            about the collectible
          </div>
          <br></br>
          <div className='has-text-weight-normal is-size-6'>
            {description} 
          </div>

          <br></br>
          <div className='has-text-weight-normal is-size-4'>
            more information
          </div>
          <br></br>
          <div className='has-text-weight-normal is-size-6'>
            <PostContent content={content} />
          </div>
          </CardContent>
          </Card>
          <br></br>
          <br></br>
          <br></br>
          {/* </div> */}
          {/* </div> */}
        {/* </div> */}
      </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  filename: PropTypes.string,
  initialposition: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        filename={post.frontmatter.filename}
        featuredimage={post.frontmatter.featuredimage}
        initialposition={post.frontmatter.initialposition}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate='%s | collectibles'>
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name='description'
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        filename
        featuredimage
        initialposition
        description
        tags
      }
    }
  }
`
