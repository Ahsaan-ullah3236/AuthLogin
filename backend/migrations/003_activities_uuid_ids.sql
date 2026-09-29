DO $$
DECLARE
  activity_id_type TEXT;
BEGIN
  SELECT data_type
  INTO activity_id_type
  FROM information_schema.columns
  WHERE table_schema = current_schema()
    AND table_name = 'activities'
    AND column_name = 'id';

  IF activity_id_type IS NULL THEN
    RAISE EXCEPTION 'activities.id column does not exist';
  END IF;

  IF activity_id_type <> 'uuid' THEN
    ALTER TABLE activities ALTER COLUMN id DROP DEFAULT;
    ALTER TABLE activities
      ALTER COLUMN id TYPE UUID USING gen_random_uuid();
  END IF;

  ALTER TABLE activities
    ALTER COLUMN id SET DEFAULT gen_random_uuid();
END $$;