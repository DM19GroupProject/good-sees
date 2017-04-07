-- takes in user id, rank
-- $1 user id
-- $2 rank
-- you must run this before applying any rank to another friend/relationship.
-- this query removes inputed rank from any friendships the user has.

UPDATE friends
SET rank = null 
WHERE friends.user_id = $1 AND friends.rank = $2;
