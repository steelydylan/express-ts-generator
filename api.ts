import { Request, Response, NextFunction } from 'express';

interface RestypedRoute {
  params?: any;
  query?: any;
  body?: any;
  response?: any;
}

export interface ExtendRequest<T extends RestypedRoute> extends Request {
  body: T['body'];
  query: T['query'];
  params: T['params'];
}

export interface ExtendResponse<T extends RestypedRoute> extends Response {
  json: (res: T['response']) => this;
}

export type Controller<T> = (
  req: ExtendRequest<T>,
  res: ExtendResponse<T>,
  next: NextFunction
) => any;

export type DefaultController = Controller<{
  body: any;
  query: any;
  params: any;
}>;
