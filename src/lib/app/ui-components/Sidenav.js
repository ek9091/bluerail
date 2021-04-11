import React from "react";
import { useRouter } from "next/router";

import { Panel, Menu, MenuItem, Button } from "../../shared/ui-components";

export const Sidenav = (props) => {
  const router = useRouter();

  const { roles = [] } = props;

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
          <div className="text-center">
            <Button label="Request a Ride" onClick={() => router.push("/")} />
          </div>
        </MenuItem>
        <MenuItem>
          <MenuOption
            icon="taxi"
            label="Scheduled Rides"
            href="/scheduled-rides"
          />
        </MenuItem>
        <MenuItem>
          <MenuOption
            icon="history"
            label="Ride History"
            href="/ride-history"
          />
        </MenuItem>
        {!roles.includes("driver") && (
          <MenuItem>
            <MenuOption
              icon="file"
              label="Become a Driver"
              href="/driver-application"
            />
          </MenuItem>
        )}
        {roles.includes("driver") && (
          <MenuItem separate>
            <h2 className="text-xs uppercase text-med-gray">Driver options</h2>
          </MenuItem>
        )}
        {roles.includes("driver") && (
          <MenuItem>
            <MenuOption
              icon="calendar"
              label="Ride Schedule"
              href="/driver-schedule"
            />
          </MenuItem>
        )}
        {roles.includes("driver") && (
          <MenuItem>
            <MenuOption
              icon="tools"
              label="Driver Settings"
              href="/driver-settings"
            />
          </MenuItem>
        )}

        {roles.some((role) => role.match(/^(employee|administrator)$/)) && (
          <MenuItem separate>
            <h2 className="text-xs uppercase text-med-gray">Admin options</h2>
          </MenuItem>
        )}
        {roles.some((role) => role.match(/^(employee|administrator)$/)) && (
          <MenuItem>
            <MenuOption
              icon="thumbs-up"
              label="Applicants"
              href="/applicants"
            />
          </MenuItem>
        )}
        {roles.includes("administrator") && (
          <MenuItem>
            <MenuOption icon="users" label="Users" href="/users" />
          </MenuItem>
        )}
      </Menu>
    </Panel>
  );
};

export default Sidenav;
