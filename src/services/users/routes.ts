import Route from "../../utils/route";
import { responseJson } from "../../utils/response";
import {
  createUser,
  getUsers,
  login,
  logout,
  refreshToken
} from "./UsersController";
import { checkRefreshParams } from "./checks";

export default [
  new Route({
    path: "/api/v1/user/refreshtoken",
    method: "get",
    handler: [
      checkRefreshParams,
      async ({ query }, res) => {
        const result = await refreshToken();
        responseJson(res, result);
      }
    ]
  }),
  new Route({
    path: "/api/v1/user/login",
    method: "get",
    handler: [
      async ({ query }, res) => {
        const result = await login();
        responseJson(res, result);
      }
    ]
  }),
  new Route({
    path: "/api/v1/user/logout",
    method: "get",
    handler: [
      async ({ query }, res) => {
        const result = await logout();
        responseJson(res, result);
      }
    ]
  }),
  new Route({
    path: "/api/v1/user/create",
    method: "get",
    handler: [
      async (req, res) => {
        const user = await createUser();
        responseJson(res, user);
      }
    ]
  }),
  new Route({
    path: "/api/v1/user/list",
    method: "get",
    handler: [
      async (req, res) => {
        const users = await getUsers();
        responseJson(res, users);
      }
    ]
  })
];
