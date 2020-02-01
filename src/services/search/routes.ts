import Route from "../../utils/route";
import { getPlacesByName } from "./SearchController";
import { checkSearchParams } from "../../middleware/checks";

export default [
  new Route({
    path: "/api/v1/search",
    method: "get",
    handler: [
      checkSearchParams,
      async ({ query }, res) => {
        const result = await getPlacesByName(query.q);
        res.header("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(result, null, 2));
      }
    ]
  })
];
