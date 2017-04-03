DROP TABLE IF EXISTS user, friends, top_friends, fav_movies, seen_movies, to_see_movies;

CREATE TABLE user(
    user_id varchar(250) PRIMARY KEY,
    first_name varchar(25),
    last_name varchar(25)
);

