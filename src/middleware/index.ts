import {
  handleBodyRequestParsing,
  handleCompression,
  handleCors,
  logger
} from "./common";

import { handleAPIDocs } from "./apiDocs";

export default [
  logger,
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleAPIDocs
];
