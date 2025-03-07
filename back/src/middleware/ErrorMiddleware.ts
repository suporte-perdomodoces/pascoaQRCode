
import type { NextFunction, Request, Response } from "express";
import type { ApiError } from "../helpers/apiErrors";


export const ErrorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.error(error);
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Inexpected Server Error";
  return res.status(statusCode).json({error: message})
}