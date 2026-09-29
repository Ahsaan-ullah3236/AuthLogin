import { readFile } from "node:fs/promises";
import pool from "../config/db.js";

const migrations = [
  "001_create_users_new.sql",
  "002_create_activities.sql",
  "003_activities_uuid_ids.sql",
  "004_user_ids_uuid.sql",
];

const client = await pool.connect();

try {
  await client.query("BEGIN");
  for (const migration of migrations) {
    const sql = await readFile(
      new URL(`../migrations/${migration}`, import.meta.url),
      "utf8",
    );
    await client.query(sql);
  }
  await client.query("COMMIT");
  console.log("Database migration completed successfully");
} catch (error) {
  await client.query("ROLLBACK").catch(() => {});
  console.error("Database migration failed:", error.message);
  process.exitCode = 1;
} finally {
  client.release();
  await pool.end();
}