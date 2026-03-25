import { Request, Response, NextFunction } from "express";

export const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(error.message);

  if (error.name === "SequelizeUniqueConstraintError") {
    const fields = (error as any).fields;
    const fieldList = Object.keys(fields || {}).join(", ");
    return response.status(409).json({
      error: `Unique constraint violation on field(s): ${fieldList}`,
    });
  }

  if (error.name === "SequelizeValidationError") {
    const messages = (error as any).errors?.map((e: any) => e.message) || [
      error.message,
    ];
    return response.status(400).json({
      error: "Validation error",
      details: messages,
    });
  }

  if (error.name === "SequelizeForeignKeyConstraintError") {
    return response.status(409).json({
      error: "Foreign key constraint violation - referenced record does not exist",
    });
  }

  if (error.name === "SequelizeExclusionConstraintError") {
    return response.status(409).json({
      error: "Exclusion constraint violation",
    });
  }

  if (error.name === "SequelizeDatabaseError") {
    console.error("Database error details:", error);
    return response.status(500).json({
      error: "Database operation failed",
    });
  }

  if (error.name === "SequelizeConnectionError") {
    console.error("Database connection error:", error);
    return response.status(503).json({
      error: "Database connection unavailable",
    });
  }

  if (error.name === "SequelizeTimeoutError") {
    return response.status(504).json({
      error: "Database query timeout",
    });
  }

  if (error.name === "SequelizeAccessDeniedError") {
    console.error("Database access denied:", error);
    return response.status(403).json({
      error: "Database access denied",
    });
  }

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "Token invalid" });
  }

  if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "Token expired" });
  }

  if (response.statusCode === 200) {
    response.status(500);
  }

  return next(error);
};

export const tokenExtractor = (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};
