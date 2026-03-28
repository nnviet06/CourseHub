import app from "./app";
import { connectDatabase } from "./database";

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDatabase()
    console.log("Connected to database successfully");

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
