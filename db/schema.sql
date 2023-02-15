DROP DATABASE IF EXISTS sneakz_dev;
CREATE DATABASE sneakz_dev;

\c sneakz_dev;

DROP TABLE IF EXISTS sneakers;

CREATE TABLE sneakers (
    id SERIAL PRIMARY KEY, 
    price NUMERIC,
    seller_id INT,
    name TEXT,
    brand TEXT,
    color TEXT,
    used BOOLEAN,
    img TEXT,
    review TEXT
);

DROP TABLE IF EXISTS cart;

CREATE TABLE cart (
    sneaker_id INT
);

--size