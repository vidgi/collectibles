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
} from "@react-three/fiber";
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
      enableZoom={true}
      maxAzimuthAngle={Math.PI}
      maxPolarAngle={2*Math.PI}
      minAzimuthAngle={-Math.PI}
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
      <section className="section section--gradient">
        <div className="container">
          {/* <div className="section"> */}
            <div className="columns">
              <div className="column is-offset-0">
                <div className="content">
                  <div className="has-text-weight-normal is-size-6">
                    <i>collectibles </i> are items worth far more than they are originally sold for, most commonly based on it's appraised rarity and popularity.
                  </div>
                  <div className="has-text-weight-normal is-size-6">
                    {description}
                  </div>
                </div>
                <Link to={`/collectible/${random}`}>
                <button className="button is-light has-text-weight-normal">
                    random collectible →
                  </button>  
                  </Link>
              </div>
              <div className="column">
              <div style={{ position: "relative", height: 500 }} className="full-width-image margin-top-0">
              <Canvas dpr={[1, 2]}>
                <CameraControls />
                <ambientLight />
                {/* <pointLight position={[10, 10, 10]} /> */}
                <Suspense fallback={null}>
                  <Scene URL = {'giraffes/small-batik'}  position={[1, 0, 0]} scale = {10}/>
                  <Scene URL = {'giraffes/large-standing'}  position={[2, 1, -2]} scale = {7} />
                  <Scene URL = {'giraffes/serenity'}  position={[3, 0, 0]} scale = {10}/>
                  <Scene URL = {'giraffes/etched-wood'}  position={[7, 0, 1]} scale = {10}/>
                  <Scene URL = {'giraffes/audubon-zoo-figurine'}  position={[5, 1, -1]} scale = {10} />
                  <Scene URL = {'giraffes/brown-batik-family'}  position={[6, 0, 0]} scale = {10}/>
                  <Scene URL = {'giraffes/brown-batik-family'}  position={[6, 0, 0]} scale = {10}/>
                  <Scene URL = {'giraffes/happy-meal'}  position={[-3, -0.7, 0]} scale = {10}/>
                  <Scene URL = {'giraffes/christmas'}  position={[7, 3,-0.5 ]} scale = {7}/>
                  <Scene URL = {'giraffes/coconut-spring'}  position={[-1, 2,-2 ]} scale = {10}/>
                  <Scene URL = {'giraffes/coin-bank'}  position={[-4, 2,-2 ]} scale = {10}/>
                  <Scene URL = {'giraffes/cute-fruit-pick'}  position={[-2.5, 2,-3 ]} scale = {10}/>
                  <Scene URL = {'giraffes/girafa'}  position={[-6, 0,-0.5 ]} scale = {5}/>
                  <Scene URL = {'giraffes/indonesian-batik'}  position={[-5.5, 1,-2 ]} scale = {10}/>
                  <Scene URL = {'giraffes/lacquered-wood'}  position={[-3, 0,-3 ]} scale = {10}/>
                  <Scene URL = {'giraffes/cambodian-silk'}  position={[3.5, 2,-3 ]} scale = {5}/>
                  <Scene URL = {'giraffes/memphis-zigzag-family'}  position={[5, 2.5,-2 ]} scale = {5}/>
                  <Scene URL = {'giraffes/orange-figurine'}  position={[-5, 2.5,0 ]} scale = {5}/>
                  <Scene URL = {'giraffes/painted-clay'}  position={[-5.5, 1.5,-1 ]} scale = {10}/>
                  <Scene URL = {'giraffes/red-bow'}  position={[1, 2.5,-5 ]} scale = {10}/>
                  <Scene URL = {'giraffes/red-wooden-batik'}  position={[-8, 1,-1 ]} scale = {5}/>
                  <Scene URL = {'giraffes/singapore-zoo'}  position={[-2, -1, 0 ]} scale = {10}/>
                  <Scene URL = {'giraffes/tray'}  position={[-4, 3,-4 ]} scale = {10}/>
                  <Scene URL = {'giraffes/unknown-zoo-figurine'}  position={[6, 1,-3 ]} scale = {10}/>
                  <Scene URL = {'giraffes/wheels'}  position={[-7, 0, 0 ]} scale = {5}/>
                  <Scene URL = {'giraffes/yellow-painted-wood'}  position={[-7, 1,-3 ]} scale = {10}/>
                  <Scene URL = {'giraffes/yellow-puppet'}  position={[-8, 3,-3 ]} scale = {10}/>
                  <Scene URL = {'mushrooms/mulch-maids'}  position={[-1, 0, 0 ]} scale = {10}/>
                  <Scene URL = {'mushrooms/ringless-honey-mushroom'}  position={[5, 2,-4 ]} scale = {5}/>
                  <Scene URL = {'mushrooms/golden-milkcap'}  position={[7.5, 1, 0 ]} scale = {10}/>

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
