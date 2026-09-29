DO $$
DECLARE
  user_id_type TEXT;
  activity_user_id_type TEXT;
BEGIN
  SELECT data_type
  INTO user_id_type
  FROM information_schema.columns
  WHERE table_schema = current_schema()
    AND table_name = 'users_new'
    AND column_name = 'id';

  SELECT data_type
  INTO activity_user_id_type
  FROM information_schema.columns
  WHERE table_schema = current_schema()
    AND table_name = 'activities'
    AND column_name = 'user_id';

  IF user_id_type = 'integer' AND activity_user_id_type = 'integer' THEN
    CREATE TEMP TABLE users_new_uuid_map (
      old_id INTEGER PRIMARY KEY,
      new_id UUID NOT NULL DEFAULT gen_random_uuid()
    ) ON COMMIT DROP;

    INSERT INTO users_new_uuid_map (old_id)
    SELECT id FROM users_new;

    ALTER TABLE activities
      DROP CONSTRAINT IF EXISTS activities_user_id_fkey;
    DROP INDEX IF EXISTS activities_user_created_at_idx;

    ALTER TABLE users_new ADD COLUMN uuid_id UUID;
    UPDATE users_new AS users
    SET uuid_id = id_map.new_id
    FROM users_new_uuid_map AS id_map
    WHERE users.id = id_map.old_id;

    ALTER TABLE activities ADD COLUMN uuid_user_id UUID;
    UPDATE activities AS activity
    SET uuid_user_id = id_map.new_id
    FROM users_new_uuid_map AS id_map
    WHERE activity.user_id = id_map.old_id;

    ALTER TABLE users_new ALTER COLUMN uuid_id SET DEFAULT gen_random_uuid();
    ALTER TABLE users_new ALTER COLUMN uuid_id SET NOT NULL;
    ALTER TABLE activities ALTER COLUMN uuid_user_id SET NOT NULL;

    ALTER TABLE users_new DROP CONSTRAINT users_new_pkey;
    ALTER TABLE users_new DROP COLUMN id;
    ALTER TABLE users_new RENAME COLUMN uuid_id TO id;
    ALTER TABLE users_new ADD CONSTRAINT users_new_pkey PRIMARY KEY (id);

    ALTER TABLE activities DROP COLUMN user_id;
    ALTER TABLE activities RENAME COLUMN uuid_user_id TO user_id;
    ALTER TABLE activities
      ADD CONSTRAINT activities_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES users_new(id) ON DELETE CASCADE;

    CREATE INDEX activities_user_created_at_idx
      ON activities (user_id, created_at DESC, id DESC);
  ELSIF user_id_type = 'uuid' AND activity_user_id_type = 'uuid' THEN
    ALTER TABLE users_new ALTER COLUMN id SET DEFAULT gen_random_uuid();
    ALTER TABLE activities ALTER COLUMN id SET DEFAULT gen_random_uuid();
  ELSE
    RAISE EXCEPTION
      'Unsupported ID types: users_new.id %, activities.user_id %',
      user_id_type,
      activity_user_id_type;
  END IF;
END $$;