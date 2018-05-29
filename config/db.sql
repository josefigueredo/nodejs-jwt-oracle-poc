-- Validation table
drop table poc_micro_01;

create table POC_MICRO_01 (
    id numeric primary key,
    name varchar2(50),
    email varchar2(75),
    password varchar2(100)
);

insert into poc_micro_01 values (
    1,
    'sistema_01',
    'sistema_01@josefigueredo.com',
    'notsosecretpassword'
);

select * from poc_micro_01;

-- The same password but encrypted, just to remind me 
update poc_micro_01
set password = '$2a$08$STTEYhnqIQKJRbgdLvrZkuF9oLPpc7smNCG85/ZLgNo.Zq85uGvOy'
where id = 1;

