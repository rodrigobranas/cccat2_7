create schema ccca;

create table ccca.item (
	id serial primary key,
	category text,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight integer
);

insert into ccca.item (category, description, price, width, height, length, weight) values ('Instrumentos Musicais', 'Guitarra', 1000, 100, 50, 15, 3);
insert into ccca.item (category, description, price, width, height, length, weight) values ('Instrumentos Musicais', 'Amplificador', 5000, 50, 50, 50, 22);
insert into ccca.item (category, description, price, width, height, length, weight) values ('Acessórios', 'Cabo', 30, 10, 10, 10, 1);

create table ccca.coupon (
	code text,
	percentage numeric,
	expire_date timestamp,
	primary key (code)
);

insert into ccca.coupon (code, percentage, expire_date) values ('VALE20', 20, '2021-10-10T10:00:00');
insert into ccca.coupon (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2020-10-10T10:00:00');

create table ccca.order (
	id serial,
	coupon_code text,
	code text,
	cpf text,
	issue_date timestamp,
	freight numeric,
	serial integer,
	primary key (id)
);

create table ccca.order_item (
	id_order integer,
	id_item integer,
	price numeric,
	quantity integer,
	primary key (id_order, id_item)
);

create table ccca.tax_table (
	id serial primary key,
	id_item integer,
	type text,
	value numeric
);

insert into ccca.tax_table (id_item, type, value) values (1, 'default', 15);
insert into ccca.tax_table (id_item, type, value) values (2, 'default', 15);
insert into ccca.tax_table (id_item, type, value) values (3, 'default', 5);
insert into ccca.tax_table (id_item, type, value) values (1, 'november', 5);
insert into ccca.tax_table (id_item, type, value) values (2, 'november', 5);
insert into ccca.tax_table (id_item, type, value) values (3, 'november', 1);
alter table ccca.order add column taxes numeric;

create table ccca.stock_entry (
	id serial primary key,
	id_item integer,
	operation text,
	quantity integer,
	date timestamp default now()
);

insert into ccca.stock_entry (id_item, operation, quantity) values (1, 'in', 10);
insert into ccca.stock_entry (id_item, operation, quantity) values (2, 'in', 10);
insert into ccca.stock_entry (id_item, operation, quantity) values (3, 'in', 10);