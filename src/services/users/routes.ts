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
  getUserByEmail,
  addContact
} from "./UsersController";
import {
  checkRefreshBody,
  checkRegisterBody,
  checkLoginBody,
  checkAddContactBody
} from "./checks";
import { getSessions } from "./SessionsController";
import { checkAccessMiddleware } from "../../middleware/checkAccess";

export default [
  new Route({
    path: "/api/v1/users/refreshtoken",
    method: "post",
    handler: [
      checkRefreshBody,
      async ({ body }, res) => {
        const result = await refreshToken(body.refreshToken);
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
  // Only for admins
  new Route({
    path: "/api/v1/users/:email",
    method: "get",
    handler: [
      checkAccessMiddleware,
      async ({ params }, res) => {
        const result = await getUserByEmail(params.email);
        responseJson(res, result.toResponseObject());
      }
    ]
  }),
  new Route({
    path: "/api/v1/users/logout",
    method: "post",
    handler: [
      checkRefreshBody,
      async ({ body }, res) => {
        const result = await logout(body.refreshToken);
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
    path: "/api/v1/profile",
    method: "get",
    handler: [
      checkAccessMiddleware,
      async (req, res) => {
        const email = req.context.user?.email || "";
        const user = await getUserByEmail(email);
        responseJson(res, user.toResponseObject());
      }
    ]
  }),

  new Route({
    path: "/api/v1/contacts",
    method: "post",
    handler: [
      checkAccessMiddleware,
      checkAddContactBody,
      async ({ body, context }, res) => {
        const email = context.user?.email || "";
        const result = await addContact(email, body.contactId);
        responseJson(res, result);
      }
    ]
  }),

  // Only for admins
  new Route({
    path: "/api/v1/users",
    method: "get",
    handler: [
      checkAccessMiddleware,
      async (req, res) => {
        const users = await getUsers();
        responseJson(res, users);
      }
    ]
  }),
  // Only for admins
  new Route({
    path: "/api/v1/users/:id",
    method: "delete",
    handler: [
      checkAccessMiddleware,
      async (req, res) => {
        const user = await deleteUser(Number(req.params.id));
        responseJson(res, user);
      }
    ]
  }),
  // Only for admins
  new Route({
    path: "/api/v1/sessions",
    method: "get",
    handler: [
      checkAccessMiddleware,
      async (req, res) => {
        const result = await getSessions();
        responseJson(res, result);
      }
    ]
  })
];
