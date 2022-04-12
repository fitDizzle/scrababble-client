import React from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { toggleThemeAction } from '../../../Redux/actions/themeActions/toggleThemeAction';

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 14px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 10%;
  height: 26px;
  width: 59px;
  border: 2px solid #c9c9c9;

  :before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 4px;
    border: 2px solid #bdbdbd;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const SliderInput = styled.input`
  :checked {
    background-color: #2196f3;
  }
  :focus {
    box-shadow: 0 0 1px #2196f3;
  }
  :checked + :before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);

    border-radius: 34px;
    :before {
      border-radius: 50%;
    }
  }
`;

const ModeSwitch = () => {
  const dispatch = useDispatch();

  const handleModeSelect = async () => {
    return await dispatch(toggleThemeAction("UPDATE_THEME_SUCCESS"));
  };

  return (
    <Switch>
      <SliderInput type="checkbox" onClick={() => handleModeSelect()} />
      <Slider></Slider>
    </Switch>
  );
};

export default ModeSwitch;
