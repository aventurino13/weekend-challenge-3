CREATE TABLE tasks (
    id SERIAL PRIMARY KEY NOT NULL,
    task_name VARCHAR(250),
    complete BOOLEAN,
);
