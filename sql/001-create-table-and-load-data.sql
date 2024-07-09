DROP TABLE IF EXISTS live;

CREATE TABLE live (
  id int unsigned AUTO_INCREMENT,
  schedule DATETIME NOT NULL,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO live (schedule, name, location) VALUES ('2024-5-9 19:00:00', 'Yngwie J.Malmsteen', 'zepp namba');
INSERT INTO live (schedule, name, location) VALUES ('2024-6-6 19:00:00', 'PRAYING MANTIS', '梅田Club Quattro');
INSERT INTO live (schedule, name, location) VALUES ('2024-9-24 19:00:00', 'IRON MAIDEN', '大阪城ホール');
INSERT INTO live (schedule, name, location) VALUES ('2024-10-19 18:00:00', 'JOURNEY', 'Asueアリーナ大阪');

