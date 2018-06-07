create table users (
    id serial primary key,
    name text unique,
    password text
);