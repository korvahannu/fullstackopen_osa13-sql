CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer NOT NULL);
\d
\d blogs
insert into blogs (author, url, title, likes) values ('Hannu Korvala', 'https://www.iltalehti.fi/', 'Iltalehti', 0);
insert into blogs (author, url, title, likes) values ('Nea Vauhkonen', 'https://github.com/korvahannu/fullstackopen_osa13-sql', 'GitHub', 10169);
select * from blogs;