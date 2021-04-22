import React from "react";
import { useRouter } from "next/router";

import {
  Panel,
  Menu,
  MenuItem,
  Button,
  Icon,
} from "../../shared/ui-components";

export const Sidenav = (props) => {
  const router = useRouter();

  const { roles = [], open = false, onClose } = props;

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

  const openState = open ? "translate-x-0" : "-translate-x-full";

  return (
    <>
      {open && (
        <div className="fixed left-0 top-0 h-screen w-screen bg-black opacity-60 md:hidden z-30"></div>
      )}
      <div
        className={`absolute left-0 top-0 transition-transform transform ${openState} md:left-auto md:top-auto md:relative md:translate-x-0 z-40`}
      >
        <Panel>
          <Button
            variant="icon"
            label={<Icon icon="times" />}
            className="md:hidden ml-auto mb-5"
            onClick={onClose}
          />
          <Menu vertical={true}>
            <MenuItem>
              <div className="text-center">
                <Button
                  label="Request a Ride"
                  onClick={() => router.push("/")}
                />
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
                <h2 className="text-xs uppercase text-med-gray">
                  Driver options
                </h2>
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
                <h2 className="text-xs uppercase text-med-gray">
                  Admin options
                </h2>
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
      </div>
    </>
  );
};

export default Sidenav;
