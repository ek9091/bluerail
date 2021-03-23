import React from "react";

import { Logo, MapSearch } from "./";
import {
  Appbar,
  Menu,
  MenuItem,
  Button,
  Icon,
} from "../../shared/ui-components";

export const Topnav = () => {
  return (
    <Appbar>
      <Logo />
      <div className="flex-grow px-4 max-w-3xl">
        <MapSearch placeholder="Where to go..." />
      </div>
      <Menu>
        <MenuItem>
          <Button variant="icon" label={<Icon icon="bell" />} />
        </MenuItem>
        <MenuItem>
          <Button variant="icon" label={<Icon icon="user" />} />
        </MenuItem>
      </Menu>
    </Appbar>
  );
};

export default Appbar;
