import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import options from "../../utils/contentfulRenderers";

const BlogBody = (props) => {
  return (
    <div className="pt-10 px-5 lg:px-20">
      {/* {props.content.map((text, index) => {
        {
          return (
            <div
              className={
                text.nodeType.startsWith("heading") && "text-xl font-bold"
              }
            >
              {text.content.map((value) => {
                return <div key={index}>{value.value}</div>;
              })}
              <br />
            </div>
          );
        }
      })} */}
      {documentToReactComponents(props.article, options)}
    </div>
  );
};

export default BlogBody;
