create schema ccca;

create table ccca.item (
	id serial primary key,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight integer
);

insert into ccca.item (description, price, width, height, length, weight) values ('Guitarra', 1000, 100, 50, 15, 3);
insert into ccca.item (description, price, width, height, length, weight) values ('Amplificador', 5000, 50, 50, 50, 22);
insert into ccca.item (description, price, width, height, length, weight) values ('Cabo', 30, 10, 10, 10, 1);
