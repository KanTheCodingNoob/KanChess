CREATE TYPE "game_mode" AS ENUM (
  'Classic',
  'Blitz'
);

CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" text UNIQUE,
  "password" text,
  "joined_at" timestamp
);

CREATE TABLE "elos" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "game_mode" game_mode
);

ALTER TABLE "elos" ADD CONSTRAINT "user_elo" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
