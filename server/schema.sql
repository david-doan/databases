DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

USE chat;


CREATE TABLE users (
  id int not null auto_increment,
  name varchar(20) unique,
  primary key(id)
);

CREATE TABLE room (
  id int not null auto_increment,
  name varchar(20),
  primary key(id)
);

CREATE TABLE friend (
  id int not null auto_increment,
  user int,
  friend int,
  primary key (id),
  foreign key (user) references users(id),
  foreign key (friend) references users(id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id int not null auto_increment,
  id_user int,
  id_room int,
  msg varchar(140),
  createAt timestamp,
  primary key (id),
  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_room) REFERENCES room(id)
);
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

