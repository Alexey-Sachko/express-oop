import Route from "../../utils/route";

export default [
  new Route({
    path: "/",
    method: "get",
    handler: async (req, res) => {
      res.send("hello world");
    }
  })
];
