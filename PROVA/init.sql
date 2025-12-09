CREATE TABLE IF NOT EXISTS alunos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  idade INTEGER
);

INSERT INTO alunos (nome, idade) VALUES
('João', 6),
('Maria', 5);
  