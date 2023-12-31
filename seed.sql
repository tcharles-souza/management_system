SET
  NAMES utf8mb4;

DROP DATABASE IF EXISTS PadariaDB;

CREATE DATABASE IF NOT EXISTS PadariaDB;

USE PadariaDB;

CREATE TABLE clientes (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  sobrenome VARCHAR(45) NULL,
  endereco VARCHAR(45) NULL,
  telefone VARCHAR(45) NULL,
  status TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE fornecedores (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL,
  razao_social VARCHAR(100) NOT NULL,
  cnpj VARCHAR(20) NOT NULL DEFAULT 1,
  email VARCHAR(100) NULL,
  telefone VARCHAR(20) NULL,
  PRIMARY KEY (id));

CREATE TABLE categorias (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL,
  PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE produtos (
  id INT NOT NULL AUTO_INCREMENT,
  codigo_de_barras VARCHAR(45) NULL UNIQUE,
  descricao VARCHAR(45) NULL,
  preco DECIMAL(10, 2) NULL,
  categoria_id INT NULL,
  fornecedor_id INT NULL,
  estoque INT NOT NULL,
  unidade ENUM('CX', 'UN',  'KG', 'OTHER') NOT NULL,
  balanca BOOLEAN NOT NULL DEFAULT false, 
  FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id),
  FOREIGN KEY (categoria_id) REFERENCES categorias(id),
  PRIMARY KEY (id)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  usuario VARCHAR(45) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE vendas (
  id_venda INT NOT NULL AUTO_INCREMENT,
  data_venda DATETIME NOT NULL,
  cliente_id INT NULL,
  vendedor VARCHAR(45) NULL,
  total DECIMAL(10,2) NULL,
  PRIMARY KEY (id_venda));

CREATE TABLE venda_produto (
  id_venda INT NOT NULL,
  id_produto INT NOT NULL,
  quantidade DECIMAL(10, 3) NOT NULL,
  preco DECIMAL (10, 2) NOT NULL,
  total DECIMAL(10,2) AS (quantidade * preco) NOT NULL,
  PRIMARY KEY (id_venda, id_produto),
  FOREIGN KEY (id_venda) REFERENCES vendas(id_venda),
  FOREIGN KEY (id_produto) REFERENCES produtos(id)
);

INSERT INTO categorias (nome) 
VALUES 
	('Pães'),
	('Bolos'), 
	('Salgados');

INSERT INTO clientes (nome, sobrenome, endereco, telefone, status)
VALUES
    ('João', 'Silva', 'Rua A, 123', '(11) 9 1111-1111', 1),
    ('Maria', 'Santos', 'Av. B, 456', '(22) 9 2222-2222', 1),
    ('Pedro', 'Ferreira', 'Praça C, 789', '(33) 9 3333-3333', 0),
    ('Ana', 'Rodrigues', 'Rua D, 101', '(44) 9 4444-4444', 1),
    ('Carlos', 'Almeida', 'Av. E, 202', '(55) 9 5555-5555', 0),
    ('Mariana', 'Costa', 'Praça F, 303', '(66) 9 6666-6666', 1),
    ('Rafael', 'Pereira', 'Rua G, 404', '(77) 9 7777-7777', 1),
    ('Camila', 'Oliveira', 'Av. H, 505', '(88) 9 8888-8888', 0),
    ('Lucas', 'Gomes', 'Praça I, 606', '(99) 9 9999-9999', 1),
    ('Isabela', 'Martins', 'Rua J, 707', '(10) 9 1010-1010', 0);

INSERT INTO fornecedores (nome, razao_social, cnpj, email, telefone)
VALUES
('Fornecedor A', 'Empresa A Ltda.', '12.345.678/0001-12', 'fornecedorA@example.com', '(11) 1111-1111'),
    ('Fornecedor B', 'Comércio B S/A', '23.456.789/0001-23', 'fornecedorB@example.com', '(22) 2222-2222'),
    ('Fornecedor C', 'Indústria C EIRELI', '34.567.890/0001-34', 'fornecedorC@example.com', '(33) 3333-3333'),
    ('Fornecedor D', 'Distribuidora D LTDA.', '45.678.901/0001-45', 'fornecedorD@example.com', '(44) 4444-4444'),
    ('Fornecedor E', 'Empresa E Ltda.', '56.789.012/0001-56', 'fornecedorE@example.com', '(55) 5555-5555'),
    ('Fornecedor F', 'Comércio F S/A', '67.890.123/0001-67', 'fornecedorF@example.com', '(66) 6666-6666'),
    ('Fornecedor G', 'Indústria G EIRELI', '78.901.234/0001-78', 'fornecedorG@example.com', '(77) 7777-7777'),
    ('Fornecedor H', 'Distribuidora H LTDA.', '89.012.345/0001-89', 'fornecedorH@example.com', '(88) 8888-8888'),
    ('Fornecedor I', 'Empresa I Ltda.', '90.123.456/0001-90', 'fornecedorI@example.com', '(99) 9999-9999'),
    ('Fornecedor J', 'Comércio J S/A', '01.234.567/0001-01', 'fornecedorJ@example.com', '(10) 1010-1010');

INSERT INTO produtos (codigo_de_barras, descricao, preco, categoria_id, fornecedor_id, estoque, unidade)
VALUES
    ('7890123456789', 'PAO FRANCES', 10, 1, 1, 100, 'UN'),
    ('7890123456790', 'PAO INTEGRAL', 10, 1, 1, 100, 'UN'),
    ('7890123456791', 'PAO DE FORMA', 10, 1, 2, 100, 'UN'),
    ('7890123456792', 'BROA DE MILHO', 10, 2, 2, 100, 'UN'),
    ('7890123456793', 'BOLO DE CHOCOLATE', 10, 2, 3, 100, 'UN'),
    ('7890123456794', 'BOLO DE CENOURA', 10, 2, 3, 100, 'UN'),
    ('7890123456795', 'CROISSANT', 10, 3, 4, 100, 'UN'),
    ('7890123456796', 'ROSQUINHA', 10, 3, 4, 100, 'UN'),
    ('7890123456797', 'BISCOITO DE AVEIA', 10, 3, 5, 100, 'UN'),
    ('7890123456798', 'BISCOITO DE CHOCOLATE', 10, 3, 5, 100, 'UN'),
    ('7890123456799', 'BOLO DE FUBA', 10, 2, 6, 100, 'UN'),
    ('7890123456800', 'PAO DE QUEIJO', 10, 1, 6, 100, 'UN'),
    ('7890123456801', 'SONHO', 10, 1, 7, 100, 'UN'),
    ('7890123456802', 'BOLACHA DE AGUA E SAL', 10, 2, 7, 100, 'UN'),
    ('7890123456803', 'COXINHA', 10, 3, 8, 10, 'UN'),
    ('7890123456804', 'EMPADA DE FRANGO', 10, 3, 8, 100, 'UN'),
    ('7890123456805', 'BOLO DE BANANA', 10, 2, 9, 100, 'UN'),
    ('7890123456806', 'PAO DE BATATA', 10, 1, 9, 100, 'UN'),
    ('7890123456807', 'BISCOITO AMANTEIGADO', 10, 3, 10, 100, 'UN'),
    ('7890123456808', 'BOLO DE MACA', 10, 2, 10, 100, 'UN');

