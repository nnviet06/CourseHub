import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      token?: string;
    }
  }
}

export const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(error.message);

  // Sequelize Unique Constraint Error (e.g., duplicate username)
  if (error.name === "SequelizeUniqueConstraintError") {
    const fields = (error as any).fields;
    const fieldList = Object.keys(fields || {}).join(", ");
    return response.status(409).json({
      error: `Unique constraint violation on field(s): ${fieldList}`,
    });
  }

  // Sequelize Validation Error
  if (error.name === "SequelizeValidationError") {
    const messages = (error as any).errors?.map((e: any) => e.message) || [
      error.message,
    ];
    return response.status(400).json({
      error: "Validation error",
      details: messages,
    });
  }

  // Sequelize Foreign Key Constraint Error
  if (error.name === "SequelizeForeignKeyConstraintError") {
    return response.status(409).json({
      error:
        "Foreign key constraint violation - referenced record does not exist",
    });
  }

  // Sequelize Exclusion Constraint Error
  if (error.name === "SequelizeExclusionConstraintError") {
    return response.status(409).json({
      error: "Exclusion constraint violation",
    });
  }

  // Sequelize Database Error (general database errors)
  if (error.name === "SequelizeDatabaseError") {
    console.error("Database error details:", error);
    return response.status(500).json({
      error: "Database operation failed",
    });
  }

  // Sequelize Connection Error
  if (error.name === "SequelizeConnectionError") {
    console.error("Database connection error:", error);
    return response.status(503).json({
      error: "Database connection unavailable",
    });
  }

  // Sequelize Timeout Error
  if (error.name === "SequelizeTimeoutError") {
    return response.status(504).json({
      error: "Database query timeout",
    });
  }

  // Sequelize Access Denied Error
  if (error.name === "SequelizeAccessDeniedError") {
    console.error("Database access denied:", error);
    return response.status(403).json({
      error: "Database access denied",
    });
  }

  // Validation Error (general)
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  // JWT Errors
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "Token invalid" });
  }

  if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "Token expired" });
  }

  // Default error handler
  if (response.statusCode === 200) {
    response.status(500);
  }
};

export const tokenExtractor = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }

  next();
};
