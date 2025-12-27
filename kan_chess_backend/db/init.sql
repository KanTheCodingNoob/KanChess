CREATE TYPE "game_mode" AS ENUM (
    'Classic',
    'Blitz'
);

CREATE TABLE "users" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" text UNIQUE,
    "password" text,
    "email" text UNIQUE,
    "joined_at" timestamp
);

CREATE TABLE "elos" (
    "id" integer PRIMARY KEY,
    "user_id" integer,
    "game_mode" game_mode
);

INSERT INTO "users" (username, password, email, joined_at)
VALUES ('Kan', '$2a$12$Fc3FzSvAaVH3QvdBSWhhlubn1N9fOeA/J2FeA0BvNbAL794/./b7K', 'an@gmail.com', NOW())
    ON CONFLICT (id) DO NOTHING;

INSERT INTO "users" (username, password, email, joined_at)
VALUES ('Man', '$2a$12$Fc3FzSvAaVH3QvdBSWhhlubn1N9fOeA/J2FeA0BvNbAL794/./b7K', 'man@gmail.com', NOW())
    ON CONFLICT (id) DO NOTHING;

ALTER TABLE "elos" ADD CONSTRAINT "user_elo" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
