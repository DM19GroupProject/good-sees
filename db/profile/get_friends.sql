-- takes in user id
-- $1 user id
-- returns all good-sees friends basic info - first name, last name, rank, picture and id.

SELECT DISTINCT
  users.fb_id,
  users.first_name,
  users.last_name,
  friends.rank,
  users.picture_url
FROM friends
  JOIN users
  ON friends.friend_id = fb_id
WHERE user_id = $1
ORDER BY friends.rank;
