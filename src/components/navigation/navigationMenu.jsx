import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Logo from "../logo/logo";
import NavBar from "./style/NavBar";
import NavItem from "./style/NavItem";
import NavItems from "./style/NavItems";
import GameNavItem from "./game/gameNavItem";

import { FaIdCard, FaHome, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

const NavigationMenu = () => {
  const history = useHistory();
  const authorization = useSelector((state) => state.auth);

  const logout = async () => {
    localStorage.removeItem("token");
    await history.push("/");
  };

  return (
    <NavBar>
      <Logo onClick={(e) => history.push("/")} />
      <NavItems>
        <NavItem>
          <Link to="/">
            <FaHome size={30} />
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/dashboard">
            <FaIdCard color={"smoke"} size={30} />
          </Link>
        </NavItem>
        <NavItem>
          <GameNavItem />
        </NavItem>
        {authorization.isAuth === true ? (
          <NavItem>
            <FaSignOutAlt color={"smoke"} size={30} onClick={logout} />
          </NavItem>
        ) : (
          <NavItem>
            <Link to="/login">
              <FaSignInAlt size={30} />
            </Link>
          </NavItem>
        )}
      </NavItems>
    </NavBar>
  );
};

export default NavigationMenu;
