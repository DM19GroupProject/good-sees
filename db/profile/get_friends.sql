-- takes in user id
-- $1 user id
-- returns all good-sees friends basic info - id, first name, last name, rank, and picture.

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
