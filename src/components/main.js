import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import pic01 from "../images/pic01.jpg";
import pic03 from "../images/pic03.jpg";
import PostBody from "./post-body";

const Main = (props) => {
  const data = useStaticQuery(graphql`
    {
      allPosts: allDatoCmsPost(sort: { fields: date, order: DESC }, limit: 20) {
        nodes {
          title
          slug
          excerpt
          content {
            value
            blocks {
              __typename
              ... on DatoCmsImageBlock {
                id: originalId
                image {
                  gatsbyImageData(width: 700)
                }
              }
              ... on DatoCmsSoundcloudBlock {
                id: originalId
                link
              }
              ... on DatoCmsYoutubeBlock {
                id: originalId
                youtube {
                  url
                }
              }
            }
          }
          date
          coverImage {
            large: gatsbyImageData(width: 1500)
            small: gatsbyImageData(width: 760)
          }
        }
      }
    }
  `);

  const close = (
    <div
      className="close"
      onClick={() => {
        props.onCloseArticle();
      }}
    ></div>
  );

  return (
    <div
      ref={props.setWrapperRef}
      id="main"
      style={props.timeout ? { display: "flex" } : { display: "none" }}
    >
      <article
        id="intro"
        className={`${props.article === "intro" ? "active" : ""} ${
          props.articleTimeout ? "timeout" : ""
        }`}
        style={{ display: "none" }}
      >
        <h2 className="major">Intro</h2>
        <span className="image main">
          <img src={pic01} alt="" />
        </span>
        <p>
          Music is nothing more than mathematical ratios - divisions of sound
          frequency and time. But if you realize that you could have more
          numbers that you find in traditional 12 tones scale - more like Dulux
          color palette... or that whenever you blink while counting 4/4 you
          miss the whole world of musical events.
        </p>
        {close}
      </article>

      <article
        id="work"
        className={`${props.article === "work" ? "active" : ""} ${
          props.articleTimeout ? "timeout" : ""
        }`}
        style={{ display: "none" }}
      >
        <h2 className="major">Work</h2>

        {data.allPosts?.nodes?.map((post) => (
          <PostBody
            content={post.content}
            title={post.title}
            date={post.date}
          />
        ))}

        {close}
      </article>

      <article
        id="about"
        className={`${props.article === "about" ? "active" : ""} ${
          props.articleTimeout ? "timeout" : ""
        }`}
        style={{ display: "none" }}
      >
        <h2 className="major">About</h2>
        <span className="image main">
          <img src={pic03} alt="" />
        </span>
        <p>
          Here I am waiting for what future brings, ready for happy accidents.
        </p>
        {close}
      </article>

      <article
        id="contact"
        className={`${props.article === "contact" ? "active" : ""} ${
          props.articleTimeout ? "timeout" : ""
        }`}
        style={{ display: "none" }}
      >
        <h2 className="major">Contact</h2>
        <form
          method="post"
          name="Contact Form"
          data-netlify="true"
          action="/thank-you"
        >
          <input type="hidden" name="form-name" value="Contact Form" />
          <div className="field half first">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="field half">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" rows="4"></textarea>
          </div>
          <ul className="actions">
            <li>
              <input type="submit" value="Send Message" className="special" />
            </li>
            <li>
              <input type="reset" value="Reset" />
            </li>
          </ul>
        </form>
        {close}
      </article>
    </div>
  );
};

Main.propTypes = {
  route: PropTypes.object,
  article: PropTypes.string,
  articleTimeout: PropTypes.bool,
  onCloseArticle: PropTypes.func,
  timeout: PropTypes.bool,
  setWrapperRef: PropTypes.func.isRequired,
};

export default Main;
