import React from "react";
import { useRouter } from "next/router";

import { Panel, Menu, MenuItem, Button } from "../../shared/ui-components";

export const Sidenav = () => {
  const router = useRouter();

  const MenuOption = ({ icon, label, href }) => {
    return (
      <Button
        icon={icon}
        label={label}
        align="left"
        variant="bare"
        onClick={() => router.push(href)}
        active={router.pathname === href}
      />
    );
  };

  return (
    <Panel>
      <Menu vertical={true}>
        <MenuItem>
          <Button label="Request a Ride" onClick={() => router.push("/")} />
        </MenuItem>
        <MenuItem>
          <MenuOption icon="taxi" label="Current Rides" href="/rides" />
        </MenuItem>
        <MenuItem>
          <MenuOption icon="history" label="Ride History" href="/history" />
        </MenuItem>
        <MenuItem separate>
          <h2 className="text-xs uppercase text-med-gray">Driver options</h2>
        </MenuItem>
        <MenuItem>
          <MenuOption icon="calendar" label="Ride Schedule" href="/schedule" />
        </MenuItem>
        <MenuItem>
          <MenuOption icon="car-side" label="Vehicles" href="/vehicles" />
        </MenuItem>
        <MenuItem>
          <MenuOption icon="tools" label="Settings" href="/driver-settings" />
        </MenuItem>
        <MenuItem separate>
          <h2 className="text-xs uppercase text-med-gray">Admin options</h2>
        </MenuItem>
        <MenuItem>
          <MenuOption
            icon="thumbs-up"
            label="Driver Requests"
            href="/requests"
          />
        </MenuItem>
      </Menu>
    </Panel>
  );
};

export default Sidenav;
