import * as React from "react";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";
import {Box, Grid, Card, CardContent, Typography, CardActionArea, CardMedia} from '@mui/material';
import TypeAnimation from 'react-type-animation';

const styles = {
  media: {
    height: '40vh',
    objectFit: 'contain'
  }
};
const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <section className="section2 container content">
      <Helmet title={`collections | ${title}`} />
        <div className="columns">
          <div
            className="column"
            style={{ marginBottom: "6rem" }}
          >
            <br></br>
            <div className="has-text-weight-normal is-size-3">
              <TypeAnimation
                    cursor={true}
                    sequence={['', 500, 'all collections']}
                    className="has-text-weight-normal is-size-3"
                  />
            </div>
            <br></br>

            <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>

{group.map((tag,index) => (
  <Grid item xs={2} sm={4} md={4} key={index}>
      <Card style={{ backgroundColor:"#dbd9c3",justifyContent: "center", display: "flex", padding:'1em'  }}>
      <CardActionArea>
      <Link to={`/collections/${kebabCase(tag.fieldValue)}/`}>
      <CardMedia
          component="img"
          sx={styles.media}
          image={`/assets/collections/${tag.fieldValue}.png`}
          alt={tag.fieldValue}
        />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          COLLECTION #{index+1}
        </Typography>
        <Typography variant="h5" component="div">
          {tag.fieldValue} 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {tag.totalCount} collectibles
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
