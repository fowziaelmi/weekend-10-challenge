CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task_to_complete" VARCHAR (250) NOT NULL,
	"complete" BOOLEAN DEFAULT FALSE ); 
INSERT INTO "tasks" ("task_to_complete", "complete")
VALUES 
('Fold Laundry', FALSE);


DROP TABLE "tasks";