import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import '@google/model-viewer/dist/model-viewer'

// eslint-disable-next-line
export const BlogPostTemplate = ({
  content,
  contentComponent,
  filename,
  description,
  tags,
  title,
  helmet
}) => {
  const PostContent = contentComponent || Content

  return (
      <section className='section section--gradient'>
        {helmet || ''}
        <div className='container content'>
        {tags && tags.length ? (
              <div style={{ marginTop: `0rem` }}>
                {/* <h4>collection</h4> */}
                <ul className='taglist'>
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      collection: <Link to={`/collections/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          <div className='has-text-weight-light is-size-3'>
            {title}
          </div>
          {/* <div className="columns"> */}
          {/* <div className="column is-10"> */}
          <div id='card'>
            {typeof window !== 'undefined' ? (
              <model-viewer
                src={filename}
                ios-src=''
                alt={filename}
                shadow-intensity='1'
                camera-controls
                auto-rotate
                ar
              ></model-viewer>
            ) : null}
          </div>
          <div className='has-text-weight-normal is-size-6'>
            about the collectible
          </div>
          <br></br>
          <div className='has-text-weight-light is-size-6'>
            {description} 
          </div>

          <br></br>
          <div className='has-text-weight-normal is-size-6'>
            more information
          </div>
          <br></br>
          <div className='has-text-weight-light is-size-6'>
            <PostContent content={content} />
          </div>
          {/* </div> */}
          {/* </div> */}
        </div>
      </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  filename: PropTypes.string,
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
        date(formatString: "MMMM DD, YYYY")
        title
        filename
        description
        tags
      }
    }
  }
`
