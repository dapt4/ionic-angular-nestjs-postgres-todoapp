CREATE DATABASE nestjstodo;

create table usuarios (
  id bigint primary key generated always as identity,
  nombre text not null,
  email text not null unique
);

create table tareas (
  id bigint primary key generated always as identity,
  usuario_id bigint references usuarios (id),
  titulo text not null,
  descripcion text,
  fecha_creacion timestamp with time zone default now(),
  completada boolean default false
);

create table historico_tareas (
  id bigint primary key generated always as identity,
  tarea_id bigint references tareas (id),
  fecha timestamp with time zone default now(),
  accion text not null,
  detalles text
);

alter table historico_tareas
add column completada boolean;

alter table usuarios
add column password text not null;
