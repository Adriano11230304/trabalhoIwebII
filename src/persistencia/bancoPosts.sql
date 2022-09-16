DROP TABLE IF EXISTS posts;

CREATE TABLE posts(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(300),
    description VARCHAR(300) NOT NULL,
    created_at timestamp NOT NULL
);