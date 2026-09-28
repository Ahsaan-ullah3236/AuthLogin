import createApp from "./app.js";
import pool from "./config/db.js";

const app = createApp();
const port = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET must be configured");
    }

    await pool.query("SELECT 1");
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log("PostgreSQL connection verified");
    });

    const shutdown = () => {
      server.close(async (error) => {
        if (error) {
          console.error("HTTP server shutdown error:", error);
          process.exitCode = 1;
        }
        await pool.end();
      });
    };

    process.once("SIGINT", shutdown);
    process.once("SIGTERM", shutdown);
  } catch (error) {
    console.error("Backend startup failed:", error.message);
    await pool.end();
    process.exitCode = 1;
  }
};

startServer();