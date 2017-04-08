-- takes in user id, friend id
-- $1 user id
-- $2 friend id

DELETE FROM friends
WHERE user_id = $1 AND friend_id = $2;
