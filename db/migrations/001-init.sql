-- CREATE TABLE IF NOT EXISTS user (' +
--     'id VARCHAR PRIMARY KEY,' +
--     'username VARCHAR NOT NULL,' +
--     'email VARCHAR NOT NULL,' +
--     'password VARCHAR NOT NULL,' +
--     'role VARCHAR NOT NULL' +
--     ')


-- Up 
CREATE TABLE `user` (
  id INTEGER PRIMARY KEY, 
  username VARCHAR NOT NULL, 
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL, 
  role VARCHAR NOT NULL
);
 
-- Down 
DROP TABLE IF EXISTS `users`;