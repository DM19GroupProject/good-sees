-- takes in user id
-- $1 user id
-- returns first name, last name, id and fb picture

SELECT DISTINCT
users.fb_id,
users.first_name,
users.last_name,
users.picture_url
FROM users
WHERE fb_id = $1;
