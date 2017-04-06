DROP TABLE IF EXISTS users, friends, movie_rating;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    fb_id BIGINT,
    first_name varchar(50),
    last_name varchar(50),
    picture_url TEXT,
    google_id TEXT,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friends
(
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    friend_id BIGINT,
    rank INT,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movie_rating
(
    id SERIAL PRIMARY KEY,
    movie_id BIGINT,
    user_id BIGINT,
    recommends BOOLEAN,
    thumbs_up INT,
    thumbs_sideways INT,
    thumbs_down INT,
    to_see BOOLEAN,
    seen BOOLEAN,
    fav BOOLEAN,
    comment_title TEXT,
    comment TEXT,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

---------------      DUMMY DATA      ---------------

INSERT INTO users
    (fb_id, first_name, last_name, picture_url, google_id)
VALUES(1197287247035846, 'Joe', 'Dirt', 'http://bit.ly/2nbmoL6', null),
    (2197287247035846, 'Stevey', 'Wonder', 'http://bit.ly/2nbmoL6', null),
    (3197287247035846, 'Louie', 'King', 'http://bit.ly/2nbmoL6', null),
    (4197287247035846, 'Pouie', 'Doo', 'http://bit.ly/2nbmoL6', null);

INSERT INTO friends
    (user_id, friend_id, rank)
VALUES(1197287247035846, 2197287247035846, 1),
    (1197287247035846, 3197287247035846, 2),
    (1197287247035846, 4197287247035846, 3),
    (2197287247035846, 4197287247035846, 1),
    (2197287247035846, 3197287247035846, 2),
    (2197287247035846, 1197287247035846, 3),
    (3197287247035846, 1197287247035846, 1),
    (4197287247035846, 1197287247035846, null),
    (4197287247035846, 3197287247035846, 1);

INSERT INTO movie_rating
    (movie_id, user_id, recommends, thumbs_up, thumbs_sideways, thumbs_down, to_see, seen, fav, comment_title, comment)
VALUES
    (4523, 1197287247035846, false, 0, 0, 1, false, true, false, 'wonderful movie', 'just kidding. not worth the plastic to make this dvd'),
    (4523, 4197287247035846, true, 1, 0, 0, true, true, true, 'changed my life', 'I literally cannot express how much this movie changed my life. Incredible. It is like I''m suddenly a princess!!'),
    (4523, 3197287247035846, false, 0, 0, 1, false, false, false, 'I don''t have time for titles', 'I was told this movie sucked. So I came here to tell everyone. Trollalala  -lallalala-lala-la.'),
    (4523, 2197287247035846, true, 0, 1, 0, false, true, false, 'ehh', 'the songs are ok. everything else is not');


select users.first_name,
    friends.user_id,
    friends.friend_id
from users
    join friends
    on friends.user_id = users.fb_id; 



select distinct users.first_name,
    friends.user_id,
    friends.friend_id
from users
    join friends
    on friends.friend_id = users.fb_id
where friends.user_id = 4197287247035846;




select distinct users.first_name,
    friends.user_id,
    friends.friend_id,
    movie_rating.user_id,
    movie_rating.recommends
from users
    join friends
    on friends.friend_id = users.fb_id
    join movie_rating
    on movie_rating.user_id = friends.friend_id
where friends.user_id = 2197287247035846;
