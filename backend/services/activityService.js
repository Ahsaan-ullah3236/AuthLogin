import pool from "../config/db.js";

export const listActivities = async (userId) => {
  const result = await pool.query(
    `SELECT id, title, description, created_at
     FROM activities
     WHERE user_id = $1
     ORDER BY created_at DESC, id DESC
     LIMIT 100`,
    [userId],
  );
  return result.rows;
};

export const createActivity = async (userId, { title, description }) => {
  const result = await pool.query(
    `INSERT INTO activities (user_id, title, description)
     VALUES ($1, $2, $3)
     RETURNING id, title, description, created_at`,
    [userId, title, description],
  );
  return result.rows[0];
};

export const updateActivity = async (
  userId,
  activityId,
  { title, description },
) => {
  const result = await pool.query(
    `UPDATE activities
     SET title = $1, description = $2
     WHERE id = $3 AND user_id = $4
     RETURNING id, title, description, created_at`,
    [title, description, activityId, userId],
  );
  return result.rows[0] ?? null;
};

export const deleteActivity = async (userId, activityId) => {
  const result = await pool.query(
    `DELETE FROM activities
     WHERE id = $1 AND user_id = $2
     RETURNING id`,
    [activityId, userId],
  );
  return result.rows[0] ?? null;
};