CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100) NOT NULL,
	"notes" VARCHAR (300) NOT NULL,
	"complete" BOOLEAN NOT NULL);

--dummy data
INSERT INTO "tasks"
	("name", "notes", "complete")
	VALUES
	('Morning Workout', 'Run 1 mile and do back and biceps workout', 'true'),
	('Make Bed', 'Do NOT get back in bed', 'true'),
	('Make Breakfast', 'Yum yum yum delicioso!', 'false');

SELECT * FROM "tasks"
    ORDER BY "id";

INSERT INTO "tasks" ("name", "notes", "complete")
    VALUES ($1, $2, $3);

UPDATE "tasks"
    SET "complete"=$1
    WHERE "id"=$2;

DELETE FROM "tasks"
    WHERE "id"=$1;