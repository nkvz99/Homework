-- HOMEWORK REQUIREMENT 1/3 -- 

-- Find all movies released in 2019 --

SELECT * FROM movies
WHERE release_date >= '2019-01-01' AND release_date < '2020-01-01';

SELECT * FROM movies
WHERE EXTRACT(YEAR FROM release_date) = 2019;       -- SAME AS UP BUT MORE SHORTER


-- Find all actors from 'British' nationality --

SELECT * FROM actors
WHERE nationality = 'British';

-- Find all movies with 'PG13' rating --

SELECT * FROM movies
WHERE rating = 'PG-13';

-- Find all directors from 'American' nationality --

SELECT * FROM directors
WHERE nationality = 'American';

-- Find all movies with duration more than 150 minutes --

SELECT * from movies
WHERE duration_minutes >150;

-- Find all actors with last name 'Pitt' --

SELECT * FROM actors
WHERE last_name = 'Pitt';

-- Find all movies with budget greater than 100 million --

SELECT * FROM movies
WHERE budget > 100000000;

-- Find all reviews with rating 5 --

SELECT * FROM reviews
WHERE rating = 5;

-- Find all movies in English language --

SELECT * FROM movies
WHERE language = 'English'

-- Find all production companies from 'California' --

SELECT * FROM production_companies
WHERE headquarters ILIKE '%California%';







