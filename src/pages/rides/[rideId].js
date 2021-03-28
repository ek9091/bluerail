import React from "react";

import { AppLayout as Layout, RideRequest } from "../../lib/app/ui-components";

export const Ride = () => {
  return (
    <Layout title="Update ride">
      <RideRequest heading="Update request" />
    </Layout>
  );
};

export default Ride;
