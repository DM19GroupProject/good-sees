-- takes user id, movie id.
-- $1 user_id
-- $2 movie_id

INSERT INTO movie_rating
  (movie_id, recommends, user_id)
SELECT $2, true, $1
WHERE NOT EXISTS (SELECT 1
FROM movie_rating
WHERE id=$2 AND user_id = $1)
ON CONFLICT
(user_id, movie_id) DO
UPDATE SET recommends= true;
