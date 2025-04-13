-- HOMEWORK REQUIREMENTS 2 --

-- Create a view that shows top rated movies. Include: movie title, average rating, review count, director name --

CREATE VIEW top_rated_movies AS
SELECT m.title AS movie_title, ROUND(AVG(r.rating), 1) AS average_rating, COUNT(r.review_id) AS review_count,
	CONCAT(d.first_name, ' ', d.last_name) AS director_name
FROM movies m
JOIN reviews r ON m.movie_id = r.movie_id
JOIN directors d ON m.director_id = d.director_id
GROUP BY m.movie_id, d.first_name, d.last_name
HAVING COUNT(r.review_id) >= 5
ORDER BY average_rating DESC;

SELECT * FROM top_rated_movies

-- Create a view for movie financial performance. Include: movie title, budget, total revenue, profit, ROI --

CREATE VIEW movie_financial_performance AS
SELECT 
    m.title AS movie_title,
    m.budget,
    mr.domestic_revenue + mr.international_revenue AS total_revenue,
    (mr.domestic_revenue + mr.international_revenue - m.budget) AS profit,
    ((mr.domestic_revenue + mr.international_revenue - m.budget) / m.budget * 100) AS roi_percentage
FROM movies m
JOIN movie_revenues mr ON m.movie_id = mr.movie_id
ORDER BY profit DESC;

SELECT * FROM movie_financial_performance

-- Create a view for actor filmography. Include: actor name, movie count, genre list, total revenue --

CREATE VIEW actor_filmography AS
SELECT 
    a.first_name AS actor_first_name, a.last_name AS actor_last_name,
    COUNT(m.movie_id) AS movie_count,
    g.name AS genre,
    SUM(mr.domestic_revenue + mr.international_revenue) AS total_revenue
FROM actors a
JOIN cast_members cm ON a.actor_id = cm.actor_id
JOIN movies m ON cm.movie_id = m.movie_id
JOIN movie_genres mg ON m.movie_id = mg.movie_id
JOIN genres g ON mg.genre_id = g.genre_id
JOIN movie_revenues mr ON m.movie_id = mr.movie_id
GROUP BY a.actor_id, a.first_name, a.last_name, g.name

SELECT * FROM actor_filmography

-- Create a view for genre statistics. Include: genre name, movie count, average rating, total revenue --

CREATE genre_statistics AS
SELECT 
    g.name AS genre_name,
    COUNT(m.movie_id) AS movie_count,
    AVG(r.rating) AS average_rating,
    SUM(mr.domestic_revenue + mr.international_revenue) AS total_revenue
FROM genres g
JOIN movie_genres mg ON g.genre_id = mg.genre_id
JOIN movies m ON mg.movie_id = m.movie_id
JOIN reviews r ON m.movie_id = r.movie_id
JOIN movie_revenues mr ON m.movie_id = mr.movie_id
GROUP BY g.name

SELECT * FROM genre_statistics

--Create a view for production company performance. Include: company name,movie count, total investment, total revenue--

CREATE VIEW production_company_performance AS
SELECT pc.name AS company_name,
    COUNT(m.movie_id) AS movie_count,
    SUM(mpc.investment_amount) AS total_investment,
    SUM(mr.domestic_revenue + mr.international_revenue) AS total_revenue
FROM production_companies pc
JOIN movie_production_companies mpc ON pc.company_id = mpc.company_id
JOIN movies m ON mpc.movie_id = m.movie_id
JOIN movie_revenues mr ON m.movie_id = mr.movie_id
GROUP BY pc.company_id, pc.name

SELECT * FROM production_company_performance