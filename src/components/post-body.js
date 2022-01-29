import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { StructuredText } from "react-datocms";

const ytRegex =
  /https:\/\/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;

export default function PostBody({ content, title, date }) {
  return (
    <>
      <h3>{title}</h3>
      <p>{date}</p>
      <StructuredText
        data={content}
        renderBlock={({ record }) => {
          if (record.__typename === "DatoCmsImageBlock") {
            return <GatsbyImage image={record.image.gatsbyImageData} />;
          }
          if (record.__typename === "DatoCmsSoundcloudBlock") {
            return (
              <span className="image main">
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameborder="no"
                  allow="autoplay"
                  src={record.link}
                ></iframe>
              </span>
            );
          }
          if (record.__typename === "DatoCmsYoutubeBlock") {
            return (
              <span className="image main">
                <iframe
                  width="100%"
                  height="300"
                  src={`https://www.youtube-nocookie.com/embed/${record.youtube?.url?.replace(
                    ytRegex,
                    "$1"
                  )}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </span>
            );
          }
          return (
            <>
              <p>Don't know how to render a block!</p>
              <pre>{JSON.stringify(record, null, 2)}</pre>
            </>
          );
        }}
      />
    </>
  );
}
