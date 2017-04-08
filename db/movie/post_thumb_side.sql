-- takes user id, movie id.
-- $1 user_id
-- $2 movie_id

INSERT INTO movie_rating
  (movie_id, thumb_down, thumb_sideways, thumb_up, user_id)
SELECT $2, false, true, false, $2
WHERE NOT EXISTS (SELECT 1
FROM movie_rating
WHERE id=$2 AND user_id = $2)
ON CONFLICT
(user_id, movie_id) DO
UPDATE SET thumb_down = false, thumb_sideways = true, thumb_up = false;
