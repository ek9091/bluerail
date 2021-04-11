import React from "react";

import { RideRequest, AppLayout as Layout } from "../lib/app/ui-components";
import { useAuth } from "../lib/app/util-hooks";

export function RequestRide() {
  const { isAuthenticated, isPending, user } = useAuth("/login");

  if (isPending || !isAuthenticated) return null;

  return (
    <Layout title="Request a Ride" roles={user.roles}>
      <RideRequest />
    </Layout>
  );
}

export default RequestRide;
