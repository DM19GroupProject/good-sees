-- takes user id, movie id.
-- $1 user_id
-- $2 movie_id

UPDATE movie_rating 
SET comment_title = null,
comment = null
WHERE movie_rating.user_id = $1
  AND movie_rating.movie_id = $2;
