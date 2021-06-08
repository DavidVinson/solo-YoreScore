
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "round" (
	"id" serial NOT NULL,
	"game_id" integer NOT NULL,
	"hole_number" integer,
	"bingo" varchar(80),
	"bango" varchar(80),
	"bongo" varchar(80),
	"start_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"end_time" TIMESTAMP,
	CONSTRAINT "round_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "game" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"course" varchar(80) NOT NULL,
	"wager" integer NOT NULL,
	"isFrontNine" BOOLEAN NOT NULL DEFAULT 'true',
	"current_round" integer NOT NULL DEFAULT '1',
	"player1" varchar(80) NOT NULL DEFAULT 'player1',
	"player2" varchar(80) NOT NULL DEFAULT 'player2',
	"player3" varchar(80) NOT NULL DEFAULT 'player3',
	"player4" varchar(80) NOT NULL DEFAULT 'player4',
	"game_mode" integer NOT NULL DEFAULT '0',
	"game_status" integer NOT NULL DEFAULT '1',
	"start_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"end_time" TIMESTAMP,
	CONSTRAINT "game_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "round" ADD CONSTRAINT "round_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "game"("id");

ALTER TABLE "game" ADD CONSTRAINT "game_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id");

