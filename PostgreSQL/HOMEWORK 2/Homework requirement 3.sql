-- HOMEWORK REQUIREMENT #3 --

-- Show all R-rated movies and their directors --

SELECT m.title, m.rating AS R_rated, d.first_name, d.last_name
FROM movies m
JOIN directors d ON m.director_id = d.director_id
WHERE m.rating::text ILIKE '%R%';

-- Show all movies from 2019 and their genres --

SELECT m.title AS movie_title, g.name AS genre, m.release_date
FROM movies m
JOIN movie_genres mg ON m.movie_id = mg.movie_id
JOIN genres g ON mg.genre_id = g.genre_id
WHERE EXTRACT(YEAR FROM m.release_date) >= 2019;

-- Show all American actors and their movies --

SELECT a.first_name AS actor_first_name, a.last_name AS actor_last_name ,a.nationality AS nationality, m.title
FROM actors a
JOIN cast_members cm ON a.actor_id = cm.actor_id
JOIN movies m ON cm.movie_id = m.movie_id
WHERE a.nationality = 'American';

-- Show all movies with budget over 100M and their production companies --

SELECT m.title AS movie_title, pc.name AS production_company , m.budget AS budget
FROM movies m
JOIN movie_production_companies mpc ON m.movie_id = mpc.movie_id
JOIN production_companies pc ON mpc.company_id = pc.company_id
WHERE m.budget > 100000000;

-- Show all movies filmed in 'London' and their directors --

SELECT m.title AS movie_title, d.first_name AS director_first_name, d.last_name AS director_last_name , ml.city AS city
FROM movies m
JOIN directors d ON m.director_id = d.director_id
JOIN movie_locations ml ON m.movie_id = ml.movie_id
WHERE ml.city ILIKE '%London%';

-- Show all horror movies and their actors -- 

SELECT m.title AS movie_title, a.first_name AS actor_first_name, a.last_name AS actor_last_name , g.name AS genre
FROM movies m
JOIN movie_genres mg ON m.movie_id = mg.movie_id
JOIN genres g ON mg.genre_id = g.genre_id
JOIN cast_members cm ON m.movie_id = cm.movie_id
JOIN actors a ON cm.actor_id = a.actor_id
WHERE g.name ILIKE '%Horror%';

-- Show all movies with reviews rated 5 and their reviewres 

SELECT m.title AS movie_title, u.username AS reviewer_username, r.rating AS rating 
FROM movies m
JOIN reviews r ON m.movie_id = r.movie_id
JOIN users u ON r.user_id = u.user_id
WHERE r.rating = 5;

-- Show all British directors and their movies --

SELECT d.first_name AS director_first_name, d.last_name, m.title AS movie_title
FROM directors d
JOIN movies m ON d.director_id = m.director_id
WHERE d.nationality = 'British';

-- Show all movies longer than 180 minutes and their genres --

SELECT m.title, g.name AS genre , m.duration_minutes AS movie_duration_minutes
FROM movies m
JOIN movie_genres mg ON m.movie_id = mg.movie_id
JOIN genres g ON mg.genre_id = g.genre_id
WHERE m.duration_minutes >= 180;

-- Show all Oscar-winning movies and their directors --

SELECT m.title AS movie_title, d.first_name AS director_first_name, d.last_name AS director_last_name, a.name AS award_name
FROM movies m
JOIN directors d ON m.director_id = d.director_id
JOIN movie_awards ma ON m.movie_id = ma.movie_id
JOIN awards a ON ma.award_id = a.award_id
WHERE a.award_type = 'Oscar';


