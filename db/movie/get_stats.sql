-- takes in movie id 
-- $1 movie id
-- returns thumb count(and total up - down), seen count, fav count, recommend count AS table (up, sideways, down, total, seen, fav, reccomend)

SELECT DISTINCT
  COALESCE(SUM(CASE WHEN thumb_down THEN -1 WHEN thumb_up THEN 1 ELSE 0 END),0) AS thumb_total,
  COALESCE(SUM(CASE WHEN thumb_up THEN 1 ELSE 0 END),0) AS thumb_up,
  COALESCE(SUM(CASE WHEN thumb_sideways THEN 1 ELSE 0 END),0) AS thumb_sideways,
  COALESCE(SUM(CASE WHEN thumb_down THEN 1 ELSE 0 END),0) AS thumb_down,
  COALESCE(SUM(CASE WHEN recommends THEN 1 ELSE 0 END),0) AS recommends,
  COALESCE(SUM(CASE WHEN fav THEN 1 ELSE 0 END),0) AS fav,
  COALESCE(SUM(CASE WHEN seen THEN 1 ELSE 0 END),0) AS seen,
  COALESCE(SUM(CASE WHEN to_see THEN 1 ELSE 0 END),0) AS to_see,
  SUM(CASE WHEN comment IS NOT NULL THEN 1 ELSE 0 END) AS comments
FROM movie_rating
WHERE movie_rating.movie_id = $1;
