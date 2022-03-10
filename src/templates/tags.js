import * as React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import {Box, Grid, Card, CardContent, Typography, CardActionArea, CardMedia} from '@mui/material';
import TypeAnimation from 'react-type-animation';

const styles = {
  media: {
    height: '40vh',
    objectFit: 'contain'
  }
};

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;

    // const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = <div><Link to={`/collections/`}>collections </Link> > {tag} </div>;
    const titleSingular = tag.slice(0, -1);
    const collectionTitle = titleSingular.concat(' collection');

    return (
      <Layout>
        <section className="section2 container content">
          <Helmet title={`${tag} | ${title}`} />
            <div className="columns">
              <div
                className="column"
                style={{ marginBottom: "6rem" }}
              >
                <br></br>
                <div className='has-text-weight-normal'>
                  {tagHeader}
                </div>
                <br></br>
                <div className='has-text-weight-normal is-size-3'>
                  <TypeAnimation
                    cursor={true}
                    sequence={['', 500, collectionTitle]}
                    className="has-text-weight-normal is-size-3"
                  />
                </div>
                <br></br>

                <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>

{posts.map((post,index) => (
  <Grid item xs={2} sm={4} md={4} key={index}>
      <Card style={{ backgroundColor:"#dbd9c3",justifyContent: "center", display: "flex",padding:'1em' }}>
      <CardActionArea>
      <Link to={post.node.fields.slug}>
      <CardMedia
          component="img"
          sx={styles.media}
          image={post.node.frontmatter.featuredimage}
          alt={post.node.frontmatter.title}
        />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {tag.slice(0, -1).toUpperCase()} #{index+1}
        </Typography>
        <Typography variant="h6" component="div">
         {post.node.frontmatter.title}
        </Typography>
      </CardContent>
      </Link>
      </CardActionArea>
    </Card>
  </Grid>
  ))}
  </Grid>
  </Box>

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
