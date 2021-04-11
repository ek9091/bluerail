import React from "react";
import axios from "axios";

import { Logo, MapSearch } from "./";
import {
  Appbar,
  Menu,
  MenuItem,
  Button,
  Icon,
} from "../../shared/ui-components";

export const Topnav = () => {
  const handleLogout = async () => {
    await axios.get("/api/logout");
    window.location.replace("/login");
  };

  return (
    <Appbar>
      <Logo />
      {/* <div className="flex-grow px-4 max-w-3xl">
        <MapSearch placeholder="Where to go..." />
      </div> */}
      <Menu>
        <MenuItem>
          <Button variant="icon" label={<Icon icon="bell" />} />
        </MenuItem>
        <MenuItem>
          <Button variant="icon" label={<Icon icon="user" />} />
        </MenuItem>
        <MenuItem>
          <Button
            variant="icon"
            label={<Icon icon="sign-out-alt" />}
            onClick={handleLogout}
          />
        </MenuItem>
      </Menu>
    </Appbar>
  );
};

export default Appbar;
