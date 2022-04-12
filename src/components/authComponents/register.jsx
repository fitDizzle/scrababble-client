import React, { useState } from "react";
import * as Styles from "./registerModal/style/registerModalStyles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerAction } from "../../Redux/actions/authActions/authAction";

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [msg, setMsg] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const sanitize = (data) => {
    const { name, username, password } = data;
    console.log("SANITIZE!!!!!!!!");
    let invalidItems = /[<>/]/g;

    if (invalidItems.test(name)) {
      console.log("MET CONDITION");
      setMsg({
        text: "Information includes invalid characters < > or /.",
        type: "error",
      });
      console.log("HELLO");
      return false;
    }
    if (invalidItems.test(username)) {
      setMsg({
        text: "Information includes invalid characters < > or /.",
        type: "error",
      });
      return false;
    }
    if (invalidItems.test(password)) {
      setMsg({
        text: "Information includes invalid characters < > or /.",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e, user) => {
    e.preventDefault();
    let res = await sanitize(user);
    console.log(res);
    if (res) {
      dispatch(registerAction(user));
      setMsg({
        text: "Thank you for registering, please login.",
        type: "success",
      });

      setTimeout(() => {
        history.push("/login");
      }, 1500);
    }

    // try {
    //   dispatch(loginAction(user));
    // } catch (error) {
    //   if (error) {
    //     console.log("ERROR REGISTERING USER - CLIENT");
    //   }
    // }

    // if (token) {
    //   await history.push("/dashboard");
    // }
    //   else {
    //   setMsg("Error Registering Your Account");
    //   return setUser({ name: "", username: "", password: "" });
    // }
  };

  return (
    <div style={{ height: "85vh", paddingTop: "50px" }}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <Styles.ModalContentTitle>
            Register A New Account
          </Styles.ModalContentTitle>
          <Styles.ModalContentContainer>
            <Styles.RegisterModalForm>
              {msg.text !== "" ? (
                <Styles.ErrorMessage type={msg.type}>
                  {msg.text}
                </Styles.ErrorMessage>
              ) : null}
              <label>Name</label>
              <Styles.ModalInput
                type="text"
                name="name"
                placeholder="enter your name"
                onChange={(e) => handleChange(e)}
              />
              <label>Username</label>
              <Styles.ModalInput
                type="text"
                name="username"
                placeholder="enter a username"
                onChange={(e) => handleChange(e)}
              />
              <label>Password</label>
              <Styles.ModalInput
                type="text"
                name="password"
                placeholder="create a password"
                onChange={(e) => handleChange(e)}
              />
            </Styles.RegisterModalForm>
            <Styles.RegisterModalFooter>
              <div style={{ marginLeft: "10px" }}>
                <p>Have an account?</p>
                <Styles.ModalButton
                  type="submit"
                  onClick={(e) => (window.location = "/login")}
                >
                  Sign in
                </Styles.ModalButton>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <p>Create new account.</p>
                <Styles.ModalButton
                  type="submit"
                  onClick={(e) => handleSubmit(e, user)}
                >
                  Register
                </Styles.ModalButton>
              </div>
            </Styles.RegisterModalFooter>
          </Styles.ModalContentContainer>
        </div>
      </div>
    </div>
  );
}
