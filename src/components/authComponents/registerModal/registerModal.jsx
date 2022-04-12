import React, { useRef } from "react";
import Modal from "../../CustomComponents/Modal";
import * as Styles from "./style/registerModalStyles";

export const RegisterModal = () => {
  const modalRef = useRef();
  return (
    <div>
      <Styles.ModalButton 
      // onClick={() => modalRef.current.openModal()}
      >
        Register
      </Styles.ModalButton>
      <Modal ref={modalRef}>
        <Styles.ModalContentTitle>
          Register A New Account
        </Styles.ModalContentTitle>
        <Styles.ModalContentContainer>
          <Styles.RegisterModalForm>
            <Styles.ModalInput type="text" placeholder="enter your name" />
            <Styles.ModalInput type="text" placeholder="enter a username" />
            <Styles.ModalInput
              type="text"
              placeholder="enter a unique password"
            />
          </Styles.RegisterModalForm>
          <Styles.RegisterModalFooter>
            <div style={{ marginLeft: "10px" }}>
              <p>Have an account?</p>
              <Styles.ModalButton type="submit">
                sign in
              </Styles.ModalButton>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <p>Create new account.</p>
              <Styles.ModalButton type="submit">
                Register
              </Styles.ModalButton>
            </div>
          </Styles.RegisterModalFooter>
        </Styles.ModalContentContainer>
      </Modal>
    </div>
  );
};

export default RegisterModal;
