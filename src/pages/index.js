import React from "react";

import { RideRequest, AppLayout as Layout } from "../lib/app/ui-components";
import { useAuth } from "../lib/app/util-hooks";

export function RequestRide() {
  const { isAuthenticated, isPending } = useAuth("/login");

  if (isPending || !isAuthenticated) return null;

  return (
    <Layout title="Request a Ride">
      <RideRequest />
    </Layout>
  );
}

export default RequestRide;
