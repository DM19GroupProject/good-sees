-- takes in user id
-- $1 user id
-- returns users interactions with movies sorted by time. In order: movie id, comment title, comment, date created, if thumb up, if thumb sideways, if thumb down, if recommended, if fav, if seen, if to see.

SELECT DISTINCT
  movie_rating.movie_id,
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
WHERE movie_rating.user_id = $1
ORDER BY movie_rating.date_created;
