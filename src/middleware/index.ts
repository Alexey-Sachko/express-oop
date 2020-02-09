import {
  handleBodyRequestParsing,
  handleCompression,
  handleCors,
  logger
} from "./common";

import { handleAPIDocs } from "./apiDocs";
import { applyContext } from "./context";

export default [
  logger,
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleAPIDocs,
  applyContext
];
