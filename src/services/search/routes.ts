import Route from "../../utils/route";
import { getPlacesByName } from "./SearchController";
import { responseJson } from "../../utils/response";
import { checkSearchParams } from "./checks";

export default [
  new Route({
    path: "/api/v1/search",
    method: "get",
    handler: [
      checkSearchParams,
      async ({ query }, res) => {
        const result = await getPlacesByName(query.q);
        responseJson(res, result);
      }
    ]
  })
];
