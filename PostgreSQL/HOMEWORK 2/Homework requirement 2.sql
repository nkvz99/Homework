-- HOMEWORK REQUIREMENT #2 --

-- Show movies and their directors --

SELECT m.title AS movie_title, d.first_name, d.last_name 
FROM movies m
JOIN directors d ON m.director_id = d.director_id;

-- Show actors and their movies --

SELECT a.first_name, a.last_name, m.title
FROM actors a
JOIN cast_members cm ON a.actor_id = cm.actor_id
JOIN movies m ON cm.movie_id = m.movie_id;

-- Show movies and their genres --

SELECT m.title AS movie_title, g.name AS genre_name
FROM movies m
JOIN movie_genres mg ON m.movie_id = mg.movie_id
JOIN genres g ON mg.genre_id = g.genre_id;

-- Show users and their reviews --

SELECT u.username, r.rating AS reviews
FROM users u
JOIN reviews r ON u.user_id = r.user_id

-- Show movies and their locations --

SELECT m.title, ml.city, ml.country, ml.specific_location
FROM movies m
JOIN movie_locations ml ON m.movie_id = ml.movie_id;

-- Show movies and their prodution companies --

SELECT m.title AS movie_title , pc.name AS production_companies
FROM movies m
JOIN movie_production_companies mpc ON m.movie_id = mpc.movie_id
JOIN production_companies pc ON mpc.company_id = pc.company_id;

-- Show actors and their awards --

SELECT a.first_name AS actor_first_name, a.last_name AS actor_last_name, aw.name award
FROM actors a
JOIN actor_awards aa ON a.actor_id = aa.actor_id
JOIN awards aw ON aa.award_id = aw.award_id;

-- Show movies and their awards --

SELECT m.title AS movie_title, aw.name AS award_name
FROM movies m
JOIN movie_awards ma ON m.movie_id = ma.movie_id
JOIN awards aw ON ma.award_id = aw.award_id;

-- Show users and their watchlist movies --

SELECT u.username AS users, m.title AS watchlist_movies
FROM users u 
JOIN user_watchlist uw ON u.user_id = uw.user_id
JOIN movies m ON uw.movie_id = m.movie_id;

-- Show movies and their revenues --

SELECT m.title AS movie_title, mr.domestic_revenue, mr.international_revenue
FROM movies m
JOIN movie_revenues mr ON m.movie_id = mr.movie_id;
