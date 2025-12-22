-- =========================
-- 1. Realize as criações das tabelas, definindo seus relacionamentos e chaves
-- =========================
CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  unit_measure TEXT NOT NULL,
  value NUMERIC NOT NULL,
  size_m2 NUMERIC NOT NULL
);

CREATE TABLE warehouse (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  available_space_m2 NUMERIC NOT NULL
);

CREATE TABLE product_warehouse (
  product_id INT NOT NULL,
  warehouse_id INT NOT NULL,
  quantity NUMERIC NOT NULL,
  PRIMARY KEY (product_id, warehouse_id),
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (warehouse_id) REFERENCES warehouse(id)
);

CREATE INDEX ix_product_warehouse_product_id ON product_warehouse (product_id);
CREATE INDEX ix_product_warehouse_warehouse_id ON product_warehouse (warehouse_id);

-- =========================
-- 2. Crie uma consulta que informe todos os armazéns com o total ocupado.
-- =========================

SELECT
  w.id,
  w.name,
  w.available_space_m2,
  COALESCE(SUM(pw.quantity * p.size_m2), 0) AS total_occupied_m2
FROM warehouse w
LEFT JOIN product_warehouse pw ON pw.warehouse_id = w.id
LEFT JOIN product p ON p.id = pw.product_id
GROUP BY w.id, w.name, w.available_space_m2
ORDER BY w.name;

-- =========================
-- 3) Crie uma procedure que dado um produto como parâmetro, informe os 5  armazéns com maior quantidade desse produto.
-- =========================

CREATE OR REPLACE FUNCTION top5_warehouses_by_product(product_id_param INT)
RETURNS TABLE (
  warehouse_id INT,
  warehouse_name TEXT,
  quantity NUMERIC
)
LANGUAGE sql
AS $$
  SELECT
    w.id,
    w.name,
    pw.quantity
  FROM product_warehouse pw
  JOIN warehouse w ON w.id = pw.warehouse_id
  WHERE pw.product_id = product_id_param
  ORDER BY pw.quantity DESC, w.id ASC
  LIMIT 5;
$$;

-- =========================
-- 4) Crie um relatório que mostre os produtos que estão em mais armazéns (em quantidade de armazéns e não em acumulado).
-- =========================

SELECT
  p.id,
  p.description,
  COUNT(*) AS warehouses_count
FROM product p
JOIN product_warehouse pw ON pw.product_id = p.id
GROUP BY p.id, p.description
ORDER BY warehouses_count DESC, p.description ASC;

-- =========================
-- 5) Crie uma consulta que mostre os produtos sem armazém alocados
-- =========================

SELECT
  p.id,
  p.description,
  p.unit_measure,
  p.value,
  p.size_m2
FROM product p
LEFT JOIN product_warehouse pw ON pw.product_id = p.id
WHERE pw.product_id IS NULL
ORDER BY p.description;

-- =========================
-- 6) Crie um relatório que mostre a lista de armazém com maior valor financeiro para empresa em ordem decrescente.
-- =========================

SELECT
  w.id,
  w.name,
  COALESCE(SUM(pw.quantity * p.value), 0) AS total_financial_value
FROM warehouse w
LEFT JOIN product_warehouse pw ON pw.warehouse_id = w.id
LEFT JOIN product p ON p.id = pw.product_id
GROUP BY w.id, w.name
ORDER BY total_financial_value DESC, w.name ASC;
