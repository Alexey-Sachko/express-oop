import Route from "../../utils/route";
import { responseJson } from "../../utils/response";
import {
  register,
  getUsers,
  login,
  logout,
  refreshToken,
  deleteUser,
  confirmEmail,
  getUserByEmail
} from "./UsersController";
import {
  checkRefreshParams,
  checkRegisterBody,
  checkLoginBody
} from "./checks";
import { getSessions } from "./SessionsController";

export default [
  new Route({
    path: "/api/v1/users/refreshtoken",
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
    path: "/api/v1/users/login",
    method: "post",
    handler: [
      checkLoginBody,
      async ({ body }, res) => {
        const result = await login(body);
        responseJson(res, result);
      }
    ]
  }),
  new Route({
    path: "/api/v1/users/:email",
    method: "get",
    handler: [
      async ({ params }, res) => {
        const result = await getUserByEmail(params.email);
        responseJson(res, result);
      }
    ]
  }),
  new Route({
    path: "/api/v1/users/logout",
    method: "get",
    handler: [
      async (req, res) => {
        const result = await logout();
        responseJson(res, result);
      }
    ]
  }),
  new Route({
    path: "/api/v1/users/register",
    method: "post",
    handler: [
      checkRegisterBody,
      async (req, res) => {
        const { username, email, password } = req.body;
        const user = await register(email, username, password);
        responseJson(res, user);
      }
    ]
  }),
  new Route({
    path: "/api/v1/users/:id/confirm/:permId",
    method: "get",
    handler: [
      async ({ params }, res) => {
        const { id, permId } = params;
        const result = await confirmEmail(Number(id), permId);
        responseJson(res, result || {});
      }
    ]
  }),
  new Route({
    path: "/api/v1/users",
    method: "get",
    handler: [
      async (req, res) => {
        const users = await getUsers();
        responseJson(res, users);
      }
    ]
  }),
  new Route({
    path: "/api/v1/users/:id",
    method: "delete",
    handler: [
      async (req, res) => {
        const user = await deleteUser(Number(req.params.id));
        responseJson(res, user);
      }
    ]
  }),
  new Route({
    path: "/api/v1/sessions",
    method: "get",
    handler: [
      async (req, res) => {
        const result = await getSessions();
        responseJson(res, result);
      }
    ]
  })
];
