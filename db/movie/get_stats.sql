-- takes in movie id 
-- returns thumb count(and total up - down), seen count, fav count, recommend count AS table (up, sideways, down, total, seen, fav, reccomend)

SELECT
  COALESCE(SUM(CASE WHEN recommends THEN 1 ELSE 0 END),0) AS recommends,
  COALESCE(SUM(CASE WHEN thumbs_up THEN 1 ELSE 0 END),0) AS thumbs_up,
  COALESCE(SUM(CASE WHEN thumbs_sideways THEN 1 ELSE 0 END),0) AS thumbs_sideways,
  COALESCE(SUM(CASE WHEN thumbs_down THEN 1 ELSE 0 END),0) AS thumbs_down,
  COALESCE(SUM(CASE WHEN to_see THEN 1 ELSE 0 END),0) AS to_see,
  COALESCE(SUM(CASE WHEN seen THEN 1 ELSE 0 END),0) AS seen,
  COALESCE(SUM(CASE WHEN fav THEN 1 ELSE 0 END),0) AS fav,
  SUM(CASE WHEN comment IS NOT NULL THEN 1 ELSE 0 END) AS comments
FROM movie_rating
WHERE movie_rating.movie_id = $1;
