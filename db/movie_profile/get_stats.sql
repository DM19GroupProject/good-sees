-- takes in movie id 
-- returns thumb count(and total up - down), seen count, fav count, recommend count as table (up, sideways, down, total, seen, fav, reccomend)

SELECT
  SUM(thumbs_up) as "thumbs up",
  SUM(thumbs_sideways) as "thumbs sideways",
  SUM(thumbs_down) as "thumbs down",
  (SUM(thumbs_up) - SUM(thumbs_down)) as "total"
FROM movie_ratings
