DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS images;

CREATE TABLE posts(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(300),
    description VARCHAR(500) NOT NULL,
    author VARCHAR(200),
    created_at date NOT NULL,
    updated_at date
);

CREATE TABLE images(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    url VARCHAR(300),
    created_at date NOT NULL,
    updated_at date,
    posts_id INTEGER NOT NULL,
    FOREIGN KEY(posts_id) references posts(id)
);

INSERT INTO posts(title, description, author, created_at) VALUES('Meu primeiro Post', 'Texto do primeiro post', 'Adriano Pereira', date('now'));
INSERT INTO posts(title, description, author, created_at) VALUES('Meu segundo Post', 'Texto do segundo Post', 'Adriano Pereira', date('now')); 
INSERT INTO images(url, created_at, posts_id) VALUES('https://s1.1zoom.me/big0/703/Planets_Trees_Night_576489_1280x800.jpg', date('now'), 1);