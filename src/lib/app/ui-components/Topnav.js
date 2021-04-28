import React from "react";
import axios from "axios";

import { Logo } from "./";
import { Appbar, Button, Icon } from "../../shared/ui-components";

export const Topnav = ({ onMenuOpen }) => {
  const handleLogout = async () => {
    await axios.get("/api/logout");
    window.location.replace("/login");
  };

  return (
    <Appbar>
      <Button
        variant="icon"
        label={<Icon icon="bars" />}
        onClick={onMenuOpen}
        className="inline-block md:hidden"
      />
      <Logo />
      <Button
        variant="icon"
        label={<Icon icon="sign-out-alt" />}
        onClick={handleLogout}
      />
    </Appbar>
  );
};

export default Appbar;
