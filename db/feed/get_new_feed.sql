-- takes in user id
-- $1 user id
-- returns friends activity time sorted with first and last name, picture url, id, movie id, comment title, date of last activity with that movie, if thumb up, if thumb sideways, if thumb down, if recommended, if fav, if seen, and if to see.

SELECT DISTINCT
  users.first_name,
  users.last_name,
  users.picture_url,
  friends.friend_id,
  movie_rating.movie_id,
  movie_rating.comment_title,
  movie_rating.date_created,
  movie_rating.thumb_up,
  movie_rating.thumb_sideways,
  movie_rating.thumb_down,
  movie_rating.recommends,
  movie_rating.fav,
  movie_rating.seen,
  movie_rating.to_see
FROM users
  JOIN friends
  ON friends.friend_id = users.fb_id
  JOIN movie_rating
  ON movie_rating.user_id = friends.friend_id
WHERE friends.user_id = $1
ORDER BY movie_rating.date_created;
