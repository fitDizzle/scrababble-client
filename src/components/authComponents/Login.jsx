import React, { useState } from "react";
import * as Styles from "./loginModal/style/loginModalStyles";
import RegisterModal from "./registerModal/registerModal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginAction } from "../../Redux/actions/authActions/authAction";

export default function Login() {

  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginAction(user, history));
  };

  return (
    <div style={{height: '85vh', paddingTop: '50px'}}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <Styles.ModalContentTitle>Sign in</Styles.ModalContentTitle>
          <Styles.ModalContentContainer>
            <Styles.RegisterModalForm>
              <label>Username</label>
              <Styles.ModalInput
                type="text"
                placeholder="enter your username"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
              <label>Password</label>
              <Styles.ModalInput
                type="password"
                placeholder="enter your password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </Styles.RegisterModalForm>
            <Styles.RegisterModalFooter>
              <div style={{ marginLeft: "10px" }}>
                <p>Click to sign in.</p>
                <Styles.ModalButton type="submit" onClick={handleSubmit}>
                  Sign in
                </Styles.ModalButton>
              </div>
              <div style={{ marginLeft: "10px" }} onClick={() => window.location = "/register"}>
                <p>Create a new account.</p>
                <RegisterModal />
              </div>
            </Styles.RegisterModalFooter>
          </Styles.ModalContentContainer>
        </div>
      </div>
    </div>
  );
}
