import { removeSession } from "../../lib/shared/util-session";

export default function (_, response) {
  try {
    removeSession(response);
    response.status(200).json({ success: "User has been logged out" });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "An error has occurred while processing your request" });
  }
}
