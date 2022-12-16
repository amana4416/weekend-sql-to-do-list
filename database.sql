CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100) NOT NULL,
	"notes" VARCHAR (300),
	"complete" BOOLEAN NOT NULL);

--dummy data
INSERT INTO "tasks"
	("name", "notes", "complete")
	VALUES
	('Morning Workout', 'Run 1 mile and do back and biceps workout', 'true'),
	('Make Bed', 'Do NOT get back in bed', 'true'),
	('Make Breakfast', 'Yum yum yum delicioso!', 'false');

