import React from "react";

const Block = (props) => {
  return (
    <div
      id={props.id}
      className={props.className} 
      x={props.x}
      y={props.y}
      onDrop={props.onDrop}
      onDragOver={props.onDragOver}
      value={props.value}
    >
      {props.children}
    </div>
  );
};

export default Block;
