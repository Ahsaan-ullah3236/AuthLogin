CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users_new(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(240) NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS activities_user_created_at_idx
  ON activities (user_id, created_at DESC, id DESC);