import React from "react";

import { useAuth } from "../../lib/app/util-hooks";
import { Panel } from "../../lib/shared/ui-components";
import { AppLayout as Layout, RideRequest } from "../../lib/app/ui-components";

export const Ride = (props) => {
  const { request = {}, error } = props;

  const { isAuthenticated, isPending } = useAuth("/login");
  if (isPending || !isAuthenticated) return null;

  return (
    <Layout title="Update ride">
      {error !== "" ? (
        <Panel>
          <p className="text-center py-10">{error}</p>
        </Panel>
      ) : (
        <RideRequest heading="Update request" currentRequest={request} />
      )}
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const moment = require("moment");

  const { req, res } = context;
  const { rideId } = context.params;
  const { db } = require("../../lib/app/data-schema");
  const { getSession } = require("../../lib/shared/util-session");

  let error = "";
  const session = await getSession(req);

  if (session.error) {
    res.writeHead(301, { location: "/login" });
    res.end();
    return;
  }

  let request = await db("ride")
    .first(
      "ride.id as rideId",
      "ride_time as rideTime",
      "ride_date as rideDate",
      "from.street as fromStreet",
      "from.city as fromCity",
      "from.state as fromState",
      "from.zip_code as fromZipCode",
      "from.place_id as fromPlaceId",
      "to.street as toStreet",
      "to.city as toCity",
      "to.state as toState",
      "to.zip_code as toZipCode",
      "to.place_id as toPlaceId"
    )
    .join("location as to", "to.id", "=", "ride.to_id")
    .join("location as from", "from.id", "=", "ride.from_id")
    .where({ "ride.id": rideId, user_id: session.data.id });

  if (request) {
    request = {
      ...request,
      rideTime: moment(`01/01/1970 ${request.rideTime}`).format("h:mm a"),
      rideDate: moment(request.rideDate).format("M/D/YYYY"),
    };
  } else {
    request = {};
    error = "Unable to locate the requested ride";
  }

  return { props: { request: { ...request }, error } };
};

export default Ride;
