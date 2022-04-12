import React, { useState, forwardRef, useImperativeHandle } from "react";

import ReactDOM from "react-dom";

const BlankDropdown = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openDrop: () => open(),
      closeDrop: () => close(),
    };
  });

  const open = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  if (display) {
    return ReactDOM.createPortal(
      <div className="dropdown-wrapper">
        <div className="modal-backdrop" />
        <div className="dropdown-box" style={{left: props.coordinates[0], top: props.coordinates[1]}}>
          {props.children}
        </div>
      </div>,
      document.getElementById("dropdown-root")
    );
  }
  return null;
});

export default BlankDropdown;
