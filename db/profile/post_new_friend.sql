-- takes in user id, friend id
-- $1 user id
-- $2 friend id

INSERT INTO friends
  (user_id, friend_id)
VALUES
  ($1, $2);
