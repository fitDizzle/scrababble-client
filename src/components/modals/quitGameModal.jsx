import React, { useState } from "react";
import styled from "styled-components";

const QuitGameModal = () => {
  const [modal, showModal] = useState(false);

  function onHandleClick(e) {
    showModal(!modal);
  }

  function renderModal() {
    return (
      <StyledModal id="quit-modal" className="modal">
        <span
          onClick={(e) => onHandleClick(e)}
          className="close"
          title="Close Modal"
        >
          &times;
        </span>
        <form className="modal-content" action="/action_page.php">
          <div className="container">
            <h1>Quit Game</h1>
            <p>Are you sure you want to quit?</p>

            <div>
              <button
                type="button"
                className="cancel-btn"
                onClick={(e) => onHandleClick(e)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={(e) => onHandleClick(e)}
              >
                Quit
              </button>
            </div>
          </div>
        </form>
      </StyledModal>
    );
  }

  return (
    <>
      {modal === false ? (
        <div className="quit-button" onClick={(e) => onHandleClick(e)}>
          QUIT GAME
        </div>
      ) : (
        renderModal()
      )}{" "}
    </>
  );
};

export default QuitGameModal;

const StyledModal = styled.div`
  #quit-modal {
    display: block;
    z-index: -1;
  }

  .button:hover {
    opacity: 1;
  }

  /* Float cancel and delete buttons and add an equal width */
  .cancel-btn,
  .delete-btn {
    float: left;
    width: 50%;
  }

  /* Add a color to the cancel button */
  .cancel-btn {
    background-color: #ccc;
    color: black;
  }

  /* Add a color to the delete button */
  .delete-btn {
    background-color: #f44336;
  }

  /* Add padding and center-align text to the container */
  .container {
    padding: 16px;
    text-align: center;
  }

  /* The Modal (background) */
  .modal {
    box-sizing: border-box;
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: -1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: #474e5d;
    padding-top: 50px;
  }

  /* Modal Content/Box */
  .modal-content {
    background-color: #fefefe;
    margin: 5% auto 15% auto;
    border: 1px solid #888;
    width: 80%;
  }

  /* Style the horizontal ruler */
  hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
  }

  /* The Modal Close Button (x) */
  .close {
    position: absolute;
    right: 35px;
    top: 15px;
    font-size: 40px;
    font-weight: bold;
    color: #f1f1f1;
  }

  .close:hover,
  .close:focus {
    color: #f44336;
    cursor: pointer;
  }

  @media screen and (max-width: 300px) {
    .cancel-btn,
    .delete-btn {
      width: 100%;
    }
  }
`;
