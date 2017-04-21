-- takes in movie id
-- $1 movie id
-- returns null or a date sorted user id, first and last name, picture, review title, review text, date created, if thumb up, if thumb sideways, if thumb down, if recommends, if fav, if seen, if to see. All ifs return as booleans. 

SELECT DISTINCT
  movie_rating.user_id,
  users.first_name,
  users.last_name,
  users.picture_url,
  movie_rating.comment_title,
  movie_rating.comment,
  movie_rating.date_created,
  movie_rating.thumb_up,
  movie_rating.thumb_sideways,
  movie_rating.thumb_down,
  movie_rating.recommends,
  movie_rating.fav,
  movie_rating.seen,
  movie_rating.to_see
FROM movie_rating
  JOIN users
  ON movie_rating.user_id = users.fb_id
WHERE movie_rating.movie_id = $1
  AND movie_rating.comment IS NOT NULL
ORDER BY movie_rating.date_created DESC;
