create table usuarios(
	id int not null auto_increment,
	nombre varchar(100),
	clave varchar(100),
	primary key(id)
);

create table tipos(
	id int not null auto_increment,
	nombre varchar(100),
	primary key(id)
);

create table generos(
	id int not null auto_increment,
	nombre varchar(100),
	primary key(id)
);

create table libros(
	id int not null auto_increment,
	titulo varchar(100),
	autor varchar(100),
	id_tipo int,
    id_genero int,
	fecha_registro varchar(100),
	primary key(id),
    foreign key (id_tipo) references tipos(id),
    foreign key (id_genero) references generos(id)
);

insert into usuarios(nombre,clave) 
	values('supervisor','$2a$12$ocxVe9TghhX5hGuGErOJkOdzRdgw.OdS8uwGtgX1T6490FDlq7/aW');

insert into tipos(nombre) 
	values('Novela');

insert into tipos(nombre) 
	values('Antología');

insert into tipos(nombre) 
	values('Novela gráfica');

insert into tipos(nombre) 
	values('Cómic');

insert into tipos(nombre) 
	values('Manga');

insert into tipos(nombre) 
	values('No ficción');

insert into tipos(nombre) 
	values('Otro');

insert into generos(nombre) 
	values('Aventura');

insert into generos(nombre) 
	values('Drama');

insert into generos(nombre) 
	values('Ciencia ficción');

insert into generos(nombre) 
	values('Terror');

insert into generos(nombre) 
	values('Suspenso');

insert into generos(nombre) 
	values('Gótico');

insert into generos(nombre) 
	values('Fantasía');

insert into libros(titulo,autor,id_tipo,id_genero,fecha_registro) 
	values('Apocalipsis','Stephen King',1,4,'2023-08-18');

insert into libros(titulo,autor,id_tipo,id_genero,fecha_registro) 
	values('It','Stephen King',1,4,'2023-08-18');

insert into libros(titulo,autor,id_tipo,id_genero,fecha_registro) 
	values('El resplandor','Stephen King',1,4,'2023-08-18');

insert into libros(titulo,autor,id_tipo,id_genero,fecha_registro) 
	values('John Constantine: Hellblazer','Alan Moore',4,1,'2023-08-18');

insert into libros(titulo,autor,id_tipo,id_genero,fecha_registro) 
	values('Batman: La broma asesina','Alan Moore',4,1,'2023-08-18');