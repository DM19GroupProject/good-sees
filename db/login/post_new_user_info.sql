
-- takes in fb id, first name, last name, and picture_url.
-- $1 fb id
-- $2 first name
-- $3 last name
-- $4 picure_url
-- will throw error if user exists.

INSERT INTO users (fb_id, first_name, last_name, picture_url)
VALUES ($1, $2, $3, $4);
