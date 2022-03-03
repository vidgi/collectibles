import React, { Suspense, useRef } from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
// import { getImage } from "gatsby-plugin-image";

import {
  Canvas,
  useLoader,
  useFrame,
  extend,
  useThree,
} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


import Scene from "../components/Scene";

import Layout from "../components/Layout";
// import FullWidthImage from "../components/FullWidthImage";
extend({ OrbitControls });


const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement },
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={false}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};


// eslint-disable-next-line
export const IndexPageTemplate = ({
  description,
  random
}) => {
  return (
    <div>
      {/* <FullWidthImage img={heroImage} title={title} subheading={subheading} /> */}
      <section className="section section--gradient">
        <div className="container">
          {/* <div className="section"> */}
            <div className="columns">
              <div className="column">
                <div className="content">
                  <div className="has-text-weight-normal is-size-6">
                    <i>collectibles </i> are items worth far more than they are originally sold for, most commonly based on it's appraised rarity and popularity.
                  </div>
                  <div className="has-text-weight-normal is-size-6">
                    {/* {description} */}
                  </div>
                </div>
                <Link to={`/collectible/${random}`}>
                <button className="button is-light has-text-weight-normal">
                    random collectible →
                  </button>  
                  </Link>
                  {/* <span>&nbsp;&nbsp;</span>

                  <Link to="/collections/mushrooms/">
                  <button className="button is-light has-text-weight-normal">
                    random collection →
                  </button>
                  </Link> */}

              </div>
              <div className="column">
              <div style={{ position: "relative", height: 500 }} className="full-width-image margin-top-0">
              <Canvas dpr={[1, 2]}>
              <CameraControls />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                          <Scene position={[0, 0, 0]}/>
                      
                      </Suspense>
                  </Canvas >
                </div>
              </div>
            </div>
          {/* </div> */}
        </div>
      </section>

   

    </div>
  );
};

IndexPageTemplate.propTypes = {
  description: PropTypes.string,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  const collectiblesList = [
    'etched-wood',
    'audubon-zoo-figurine',
    'brown-batik-family',
    'brown-puppet',
    'cambodian-silk',
    'christmas',
    'coconut-spring',
    'coin-bank',
    'cute-fruit-pick',
    'girafa',
    'golden-milkcap',
    'happy-meal',
    'indonesian-batik',
    'lacquered-wood',
    'large-standing',
    'memphis-zigzag-family',
    'mulch-maids',
    'orange-figurine',
    'painted-clay',
    'red-bow',
    'red-wooden-batik',
    'ringless-honey-mushroom',
    'serenity',
    'singapore-zoo',
    'small-batik',
    'tray',
    'unknown-zoo-figurine',
    'wheels',
    'yellow-painted-wood',
    'yellow-puppet'];

  const random = Math.floor(Math.random() * collectiblesList.length);
  const randomURL = collectiblesList[random]

  return (
    <Layout>
      <IndexPageTemplate
        description={frontmatter.description}
        random={randomURL}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        description
      }
    }
  }
`;
