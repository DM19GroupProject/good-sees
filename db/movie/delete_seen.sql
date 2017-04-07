-- takes movie id, user id.

UPDATE movie_rating 
SET seen = false
WHERE movie_rating.user_id = $1
  AND movie_rating.movie_id = $2;
