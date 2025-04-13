-- HOMEWORK REQUIREMENTS 1/2 --

-- Find all genres that have more than 3 movies with a rating of 'R' --

SELECT g.name AS genre, COUNT(*) AS movie_count
FROM genres g
JOIN movie_genres mg ON g.genre_id = mg.genre_id
JOIN movies m ON mg.movie_id = m.movie_id
WHERE m.rating = 'R'::mpaa_rating
GROUP BY g.name
HAVING COUNT(*) > 3;

-- Find directors who have made movies with total revenue over 500 million and have directed at least 2 movies --

SELECT d.first_name, d.last_name, COUNT(m.movie_id) AS movie_count, 
       SUM(r.domestic_revenue + r.international_revenue) AS total_revenue
FROM directors d
JOIN movies m ON d.director_id = m.director_id
JOIN movie_revenues r ON m.movie_id = r.movie_id
GROUP BY d.director_id
HAVING COUNT(m.movie_id) >= 2 AND SUM(r.domestic_revenue + r.international_revenue) > 500000000;



-- Find actors who have appeared in more than 2 different genres and have won at least 1 award --

SELECT a.first_name, a.last_name, g.name AS genre, aw.name AS award
FROM actors a
JOIN cast_members cm ON a.actor_id = cm.actor_id
JOIN movie_genres mg ON cm.movie_id = mg.movie_id
JOIN genres g ON mg.genre_id = g.genre_id
JOIN actor_awards aa ON a.actor_id = aa.actor_id
JOIN awards aw ON aa.award_id = aw.award_id
GROUP BY a.actor_id, a.first_name, a.last_name, g.name, aw.name
HAVING COUNT(mg.genre_id) > 2 AND COUNT(aa.award_id) >= 1;

-- Find movies that have received more than 3 reviews with an average rating above 7 --

SELECT m.title AS movie_title, COUNT(r.review_id) AS review_count, AVG(r.rating) AS avg_rating
FROM movies m
JOIN reviews r ON m.movie_id = r.movie_id
GROUP BY m.movie_id
HAVING COUNT(r.review_id) > 3 AND AVG(r.rating) > 7;

--Find production companies that have invested more than 100 million in movies released after 2015 --

SELECT pc.name AS production_company, m.title AS movie_title, SUM(mpc.investment_amount) AS total_investment
FROM production_companies pc
JOIN movie_production_companies mpc ON pc.company_id = mpc.company_id
JOIN movies m ON mpc.movie_id = m.movie_id
WHERE EXTRACT(YEAR FROM m.release_date) > 2015
GROUP BY pc.company_id, pc.name, m.movie_id, m.title
HAVING SUM(mpc.investment_amount) > 100000000;

-- Find countries where more than 2 movies were filmed with a total budget exceeding 150 million --

SELECT ml.country, COUNT(ml.movie_id) AS movie_count, SUM(m.budget) AS total_budget
FROM movie_locations ml
JOIN movies m ON ml.movie_id = m.movie_id
GROUP BY ml.country
HAVING COUNT(ml.movie_id) > 2 
AND SUM(m.budget) > 150000000;

-- Find genres where the average movie duration is over 120 minutes and at least one movie has won an Oscar --

SELECT g.name
FROM genres g
JOIN movie_genres mg ON g.genre_id = mg.genre_id
JOIN movies m ON mg.movie_id = m.movie_id
LEFT JOIN movie_awards ma ON m.movie_id = ma.movie_id
LEFT JOIN awards a ON ma.award_id = a.award_id AND a.award_type = 'Oscar'
GROUP BY g.genre_id
HAVING AVG(m.duration_minutes) > 120 AND COUNT(a.award_id) > 0;

-- Find years where more than 3 movies were released with an average budget over 50 million --

SELECT EXTRACT(YEAR FROM m.release_date) AS release_year,COUNT(*) AS movie_count, AVG(m.budget) AS avg_budget
FROM movies m
GROUP BY release_year
HAVING COUNT(*) > 3 AND AVG(m.budget) > 50000000;


-- Find actors who have played lead roles in more than 2 movies with a total revenue exceeding 200 million -- 

SELECT a.first_name AS actor_first_name, a.last_name AS actor_last_name, 
    COUNT(DISTINCT cm.movie_id) AS lead_roles,
    TO_CHAR(SUM(r.domestic_revenue + r.international_revenue), '9,999,999,999') AS total_revenue
FROM actors a
JOIN cast_members cm ON a.actor_id = cm.actor_id AND cm.is_lead_role = true
JOIN movie_revenues r ON cm.movie_id = r.movie_id
GROUP BY a.actor_id, a.first_name, a.last_name
HAVING COUNT(DISTINCT cm.movie_id) > 2 
AND SUM(r.domestic_revenue + r.international_revenue) > 200000000
ORDER BY total_revenue DESC;


