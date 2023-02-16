DROP DATABASE IF EXISTS sneakz_dev;
CREATE DATABASE sneakz_dev;

\c sneakz_dev;

DROP TABLE IF EXISTS sneakers;

CREATE TABLE sneakers (
    id SERIAL PRIMARY KEY, 
    price NUMERIC,
    size NUMERIC,
    name TEXT,
    brand TEXT,
    color TEXT,
    used BOOLEAN,
    img TEXT
);

DROP TABLE IF EXISTS cart;

CREATE TABLE cart (
    sneaker_id INT
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
 id SERIAL PRIMARY KEY,
 reviewer TEXT,
 content TEXT,
 sneaker_id INTEGER REFERENCES sneakers (id)
 ON DELETE CASCADE
);