DROP TABLE IF EXISTS users, friends, movie_rating;
DROP INDEX IF EXISTS users_index, friends_index,movie_index;


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

CREATE UNIQUE INDEX users_index ON users(fb_id);


CREATE TABLE friends
(
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    friend_id BIGINT,
    rank INT,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX friends_index ON friends(user_id, friend_id);

CREATE TABLE movie_rating
(
    id SERIAL PRIMARY KEY,
    movie_id INT,
    user_id BIGINT,
    thumb_up BOOLEAN,
    thumb_sideways BOOLEAN,
    thumb_down BOOLEAN,
    recommends BOOLEAN,
    fav BOOLEAN,
    seen BOOLEAN,
    to_see BOOLEAN,
    comment_title TEXT,
    comment TEXT,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX movie_index ON movie_rating(movie_id, user_id);

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
    (movie_id, user_id, recommends, thumb_up, thumb_sideways, thumb_down, to_see, seen, fav, comment_title, comment)
VALUES
    (4523, 1197287247035846, false, false, false, true, false, true, false, 'wonderful movie', 'just kidding. not worth the plastic to make this dvd'),
    (4523, 4197287247035846, true, true, false, false, true, true, true, 'changed my life', 'I literally cannot express how much this movie changed my life. Incredible. It is like I''m suddenly a princess!!'),
    (4523, 3197287247035846, false, false, false, true, false, false, false, 'I don''t have time for titles', 'I was told this movie sucked. So I came here to tell everyone. Trollalala  -lallalala-lala-la.'),
    (4523, 2197287247035846, true, false, true, false, false, true, false, 'ehh', 'the songs are ok. everything else is not'),
    (69531, 2197287247035846, true, false, false, false, true, false, true, 'i don''t even know', 'i think i want to see this movie'),
    (920, 2197287247035846, true, true, false, false, true, true, true, 'cars!', 'kids movies are my favorite movies.'),
    (10195, 2197287247035846, false, true, false, false, false, true, true, 'that hammer tho', 'i like thor. his hair made me too jealous to finish watching. :('),
    (10020, 2197287247035846, true, true, false, false, true, true, true, 'teapots', 'singing teapots make my day. everyday.');




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
