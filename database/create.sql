create schema ccca;

create table ccca.item (
    id serial,
    description text,
    price numeric,
    height integer,
    width integer,
    length integer,
    weight integer
);
