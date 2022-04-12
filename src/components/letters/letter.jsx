import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import StyledLetter from "./styles/styledLetter";

export const Letter = forwardRef((props, ref) => {

  const [state, setState] = useState({
    status: true,
    isLetterDraggable: true,
  });

  const flattenTile = () => {
    setState({
      ...state,
      isLetterDraggable: false
    })
  }

  useImperativeHandle(ref, () => {
    return {
      flatten: () => flattenTile(),
    };
  });

  useEffect(() => {
    if (props.onBoard) {
      setState({
        status: true,
        isLetterDraggable: false,
      });
    } else {
      setState({
        status: true,
        isLetterDraggable: true,
      });
    }
  }, [state.status, props.onBoard]);


  function dragStart_Handler(e) {
    try {
      e.dataTransfer.setData("block-letter-data", e.target.id);
      e.dataTransfer.effectAllowed = "move";
    } catch (error) {
      if (error) {
        console.log(error);
        return;
      }
    }
  }

  const handleDoubleClick = (e) => {
    e.preventDefault();
    if(props.tileState !== "locked"){
      setState({ status: true, isLetterDraggable: true });

    }
  };

  const dragStop_Handler = (e) => {
    e.preventDefault();
  };

  return (
    <StyledLetter
      id={props.id}
      draggable={state.isLetterDraggable}
      onDragStart={(e) => dragStart_Handler(e)}
      onDragEnd={(e) => dragStop_Handler(e)}
      onDoubleClick={(e) => handleDoubleClick(e)}
      status={state.status.toString()}
      value={props.value}
    >
      {props.children}
    </StyledLetter>
  );
});

export default Letter;
