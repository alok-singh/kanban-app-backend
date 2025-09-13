CREATE DATABASE kanban_board;

USE kanban_board;

CREATE TABLE IF NOT EXISTS boards (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL
);

CREATE TYPE task_status AS ENUM ('TODO', 'DOING', 'DONE');

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  board_id INTEGER REFERENCES boards(id),
  title VARCHAR(50) NOT NULL,
  description VARCHAR(5000),
  status task_status NOT NULL
);
