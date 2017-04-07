-- takes user id, movie id, review title, and review.
-- $1 user_id
-- $2 movie_id
-- $3 comment_title (review_title)
-- $4 comment (review)

INSERT INTO movie_rating
  (movie_id, comment_title, comment, user_id)
SELECT $2, $3, $4, $1
WHERE NOT EXISTS (SELECT 1
FROM movie_rating
WHERE id=$2 AND user_id = $1)
ON CONFLICT
(user_id, movie_id) DO
UPDATE SET comment_title= $3, comment = $4;
