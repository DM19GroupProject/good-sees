DROP TABLE IF EXISTS users, friends, fav_movies, seen_movies, to_see_movies, movie_ratings;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    fb_id BIGINT,
    first_name varchar(50),
    has_comments BOOLEAN,
    first_comment_snippet TEXT,
    last_name varchar(50),
    picture_url TEXT,
    fb_friends TEXT,
    google_id TEXT,
    recommended_movies TEXT,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users
    (fb_id, first_name, last_name, picture_url, fb_friends, google_id)
VALUES(1197287247035846, 'Joe', 'Dirt', 'http:
//bit.ly/2nbmoL6', '1197987247035846, 11972872447035846,1197287247035826, 1797287247035846', null);

CREATE TABLE friends
(
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    friend_id BIGINT,
    rank INT,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE to_see_movies
-- (
--   id SERIAL PRIMARY KEY,
--   user_id BIGINT,
--   movie_id BIGINT,
--   date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE seen_movies
-- (
--   id SERIAL PRIMARY KEY,
--   user_id BIGINT,
--   movie_id BIGINT,
--   has_comment BOOLEAN,

--   date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE fav_movies
-- (
--   id SERIAL PRIMARY KEY,
--   user_id BIGINT,
--   movie_id BIGINT,
--   has_comment BOOLEAN,
--   date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE movie_ratings
(
    id SERIAL PRIMARY KEY,
    movie_id BIGINT,
    user_id BIGINT,
    reccomends BOOLEAN,
    thumbs_up INT,
    thumbs_sideways INT,
    thumbs_down INT,
    want_to_see BOOLEAN,
    seen BOOLEAN,
    fav BOOLEAN,
    comment_title TEXT,
    comment TEXT,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO movie_ratings
    (movie_id, thumbs_up, thumbs_sideways, thumbs_down, user_id, comment_title, comment, fav, seen)
VALUES
    (4523, 0, 0, 1, 1197287247035846, 'wonderful movie', 'just kidding. not worth the plastic to make this dvd', false, true),
    (4523, 0, 1, 0, 1197287247035849, 'ehh', 'the songs are ok. everything else is not', false, true);
