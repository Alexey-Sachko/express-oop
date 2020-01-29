import { Request } from "express";

type ConstructorProps = {
  params: Request["params"];
  query: Request["query"];
  body: Request["body"];
  send: (status: number, body?: unknown) => void;
  uriGenerator: unknown;
};

export default class ControllerBase {
  params: Request["params"];
  query: Request["query"];
  body: Request["body"];
  send: (status: number, body?: unknown) => void;
  uriGenerator: unknown;

  constructor({ uriGenerator, params, query, send, body }: ConstructorProps) {
    this.uriGenerator = uriGenerator;
    this.query = query;
    this.body = body;
    this.params = params;
    this.send = send;
  }

  error(err: any) {
    const status = err.statusCode || err.status;
    const statusCode = status || 500;
    this.send(statusCode, err);
  }

  created(location: unknown, data: unknown) {
    if (location) {
      this.send(200, data);
    }

    this.send(201, data);
  }

  ok(data: unknown) {
    this.send(200, data);
  }

  noContent() {
    this.send(204);
  }
}
