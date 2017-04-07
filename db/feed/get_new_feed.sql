-- takes in user id, and page needed(zero for first one)

-- returns list of movie ids paired with recommendation data, seen/to see/favs list data, and thumbs data

-- stretch feature, implement sessions/reload state type of page organizations. like pull up and reload feed, vs just paging out the stuff that loaded on the first page-visit time.


SELECT DISTINCT users.first_name,
  friends.user_id,
  friends.friend_id,
  movie_rating.user_id,
  movie_rating,
  movie_rating.date_created
FROM users
  JOIN friends
  ON friends.friend_id = users.fb_id
  JOIN movie_rating
  ON movie_rating.user_id = friends.friend_id
WHERE friends.user_id = $1
ORDER BY movie_rating.date_created;
