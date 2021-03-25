import React from "react";

import { Panel, Button, Icon } from "./";

export const Modal = (props) => {
  const { children, open = false, onClose = () => null } = props;

  if (!open) return null;

  return (
    <div className="fixed left-0 top-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80">
      <div className="w-full max-w-xl">
        <Panel>
          <div className="pt-5 pb-4 px-2">
            <div className="absolute right-3 top-3">
              <Button
                variant="iconSmall"
                label={<Icon icon="times" color="white" size="sm" />}
                onClick={onClose}
              />
            </div>
            {children}
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default Modal;
