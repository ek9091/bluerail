import React from "react";

import { useAuth } from "../../lib/app/util-hooks";
import { AppLayout as Layout, RideRequest } from "../../lib/app/ui-components";

export const Ride = () => {
  const { isAuthenticated, isPending } = useAuth("/login");
  if (isPending || !isAuthenticated) return null;

  return (
    <Layout title="Update ride">
      <RideRequest heading="Update request" />
    </Layout>
  );
};

export default Ride;
