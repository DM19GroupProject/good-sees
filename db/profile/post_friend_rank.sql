-- takes in user id, friend id, rank.
-- $1 user id
-- $2 friend id
-- $3 rank
-- you must delete the rank before you post/update that rank to another friend/relationship. 

UPDATE friends 
SET rank = $3 
WHERE friends.user_id = $1 AND friends.friend_id = $2;
