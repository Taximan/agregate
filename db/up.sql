create table users (
    id serial primary key,
    name text unique,
    password text
);

create table submissions (
    id serial primary key,
    created_at timestamp without time zone,
    title text,
    author_id integer references users(id),
    url text,
    description text   
);

create table votes (
    user_id integer references users(id),
    submission_id integer references submissions(id),
    primary key (user_id, submission_id),
    vote integer
);