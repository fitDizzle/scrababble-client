import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { loginAction } from "../../../Redux/actions/authActions/authAction";

import Modal from "../../CustomComponents/Modal";
import * as Styles from "./style/loginModalStyles";

const LoginModal = () => {
  const dispatch = useDispatch();
  const modalRef = useRef();
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
    await dispatch(loginAction(user));
    history.push("/dashboard");
  };

  return (
    <div>
      <Styles.ModalSubmitButton onClick={() => modalRef.current.openModal()}>Sign in</Styles.ModalSubmitButton>
      <Modal ref={modalRef}>
        <Styles.ModalContentTitle>sign in</Styles.ModalContentTitle>
        <Styles.ModalContentContainer>
          <Styles.RegisterModalForm>
            <label>Username</label>
            <Styles.ModalInput
              type="text"
              placeholder="enter a username"
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
              <p>Have an account?</p>
              <Styles.ModalSubmitButton type="submit" onClick={handleSubmit}>
                sign in
              </Styles.ModalSubmitButton>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <p>Create new account.</p>
              <Styles.ModalSubmitButton type="submit">
                Register
              </Styles.ModalSubmitButton>
            </div>
          </Styles.RegisterModalFooter>
        </Styles.ModalContentContainer>
      </Modal>
    </div>
  );
};

export default LoginModal;
