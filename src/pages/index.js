import React from "react";

import { RideRequest, AppLayout as Layout } from "../lib/app/ui-components";

export function RequestRide() {
  return (
    <Layout title="Request a Ride">
      <RideRequest />
    </Layout>
  );
}

export default RequestRide;
