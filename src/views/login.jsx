import React, { useState } from "react";
import Login from "../components/authComponents/Login";
import Register from "../components/authComponents/register";

const LoginPage = (props) => {
  const [view, setView] = useState(<Login />);
 
  return (
    <div>{view}</div>
  );
};

export default LoginPage;
