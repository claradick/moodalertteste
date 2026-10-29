CREATE DATABASE IF NOT EXISTS moodalert
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE moodalert;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  perfil ENUM('paciente','medico') NOT NULL DEFAULT 'paciente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vinculos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  medico_id INT NOT NULL,
  paciente_id INT NOT NULL,
  UNIQUE (medico_id, paciente_id),
  FOREIGN KEY (medico_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (paciente_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE registros_afetivograma (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  data_registro DATE NOT NULL,
  humor TINYINT NOT NULL,            -- -3 (depressão) a +3 (mania)
  energia TINYINT NOT NULL,          -- 0 a 10
  sono_horas DECIMAL(3,1) NOT NULL,
  ansiedade TINYINT NOT NULL,        -- 0 a 10
  irritabilidade TINYINT NOT NULL,   -- 0 a 10
  observacao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE diario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  texto TEXT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE alarmes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  titulo VARCHAR(120) NOT NULL,
  horario TIME NOT NULL,
  dias VARCHAR(50),
  ativo BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE anotacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  titulo VARCHAR(120) NOT NULL,
  conteudo TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Paciente de teste (a senha real e o hash entram na Entrega 3)
INSERT INTO usuarios (nome, email, senha_hash, perfil)
VALUES ('Paciente Teste', 'paciente@teste.com', 'provisorio', 'paciente');