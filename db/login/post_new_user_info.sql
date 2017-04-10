-- posts all known data from first fb login
-- takes in all fb data
insert into users (fb_id, first_name, last_name)
values ($1, $2, $3);
