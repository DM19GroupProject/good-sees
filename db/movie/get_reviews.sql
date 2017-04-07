-- takes in movie id
-- returns null or set of review content/review title/review date and time/reviewer name/reviewer picture/seen/fav/want to see/thumbs and recommendation too

SELECT movie_rating.comment_title,
  movie_rating.comment
FROM movie_rating
WHERE movie_rating.movie_id = $1
  AND movie_rating.comment IS NOT NULL;
