CREATE TABLE student (
	id INTEGER,
	first_name VARCHAR(50) 	NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	date_of_birth DATE,
	enrolled_date DATE,
	gender VARCHAR(10),
	national_id_number VARCHAR(20),
	student_card_number VARCHAR(20)
);

SELECT * FROM student


CREATE TABLE teacher (
	id INTEGER,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	date_of_birth DATE,
	academic_rank VARCHAR(50),
	hire_date DATE
);

SELECT * FROM teacher


CREATE TABLE course (
	id INTEGER,
	name VARCHAR(50) NOT NULL,
	credit INTEGER,
	academic_year INTEGER,
	semester INTEGER
);

SELECT * FROM course

CREATE TABLE achievement_type (
	id INTEGER,
	name VARCHAR(50) NOT NULL,
	description TEXT,
	participation_rate DECIMAL(10,2)
);

SELECT * FROM achievement_type

CREATE TABLE grade (
	id INTEGER,
	student_id INTEGER,
	course_id INTEGER,
	teacher_id INTEGER,
	grade SMALLINT,
	comment TEXT,
	created_date DATE
);

SELECT * FROM grade

CREATE TABLE grade_details(
	id INTEGER,
	grade_id INTEGER,
	achievement_type_id VARCHAR(20),
	achievement_points INTEGER,
	achievement_max_points INTEGER,
	achievement_date DATE
);

SELECT * FROM grade_details
