-- takes in id returns boolean

SELECT CASE WHEN EXISTS (
    SELECT *
  FROM users
  WHERE users.fb_id = $1
)
THEN CAST(1 AS BIT)
ELSE CAST(0 AS BIT) END
