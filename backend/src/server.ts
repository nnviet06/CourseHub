// import app from './app' and start the server
// entry point for backend server

import { Request, Response, NextFunction } from "express";
import app from "./app";
import { initUserModel } from "./models/users";
import sequelize from "./database";

const PORT = process.env.PORT || 5000;

// Status check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "404 not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const start = async () => {
  try {
    initUserModel(sequelize);
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`http://localhost:${PORT}/api`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (err) {
    console.error("startup failed", err);
    process.exit(1);
  }
};

start();
