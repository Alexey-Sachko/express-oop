import Route from "../../utils/route";
import { responseJson } from "../../utils/response";

export default [
  new Route({
    path: "/api/v1/auth",
    method: "get",
    handler: [
      async ({ query }, res) => {
        // const result = await getPlacesByName(query.q);
        responseJson(res, { foo: "bar" });
      }
    ]
  })
];
