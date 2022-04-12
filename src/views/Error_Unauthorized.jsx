import React from "react";

const Error_Unauthorized = () => {
  return (
    <div className="unauthorized-page-container">
      <h1>Error: 418 "I'm a Teapot"</h1>
      <h2>Oops!</h2>
      <h3>
        The server refuses to brew coffee because it is, permanently, a teapot.
        A combined coffee/tea pot that is temporarily out of coffee should
        instead return 503.
      </h3>
      <p>Unauthorized: please login</p>
    </div>
  );
};

export default Error_Unauthorized;
