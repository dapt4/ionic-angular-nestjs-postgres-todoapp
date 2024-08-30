CREATE DATABASE railway;

drop table if exists task_history;

drop table if exists tasks;

drop table if exists users;

create table users (
  id bigint primary key generated always as identity,
  name text not null,
  email text not null unique,
  password text not null
);

create table tasks (
  id bigint primary key generated always as identity,
  user_id bigint references users (id),
  title text not null,
  description text,
  created_at timestamp with time zone default now(),
  completed boolean default false
);

create table task_history (
  id bigint primary key generated always as identity,
  task_id bigint references tasks (id),
  date timestamp with time zone default now(),
  action text not null,
  details text,
  completed boolean
);
