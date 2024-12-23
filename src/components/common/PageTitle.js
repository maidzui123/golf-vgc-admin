import React from "react";
import { Helmet } from "react-helmet";

const PageTitle = ({ title, description }) => {
  return (
    <Helmet>
      <title>
        {" "}
        {title
          ? ` ${title} | Golf VGC | Admin`
          : "Golf VGC | Admin"}
      </title>
      <meta
        name="description"
        content={
          description
            ? ` ${description} `
            : "Golf VGC | Admin"
        }
      />
    </Helmet>
  );
};

export default PageTitle;
