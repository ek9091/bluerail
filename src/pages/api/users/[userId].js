import connect from "next-connect";

export default connect().get((request, response) => {
  response.status(200).json({ status: "done" });
});
