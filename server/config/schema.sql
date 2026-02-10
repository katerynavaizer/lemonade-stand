-- 1. Create Beverages Table (Safe to run repeatedly)
CREATE TABLE IF NOT EXISTS beverages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    is_available BOOLEAN DEFAULT TRUE
);

-- 2. Create Orders Table (Safe to run repeatedly)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    order_items JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Seed Data
-- This cryptic syntax ensures we only insert rows IF the table is currently empty.
INSERT INTO beverages (name, price, description)
SELECT * FROM (VALUES
    ('Classic Lemonade', 5.00, 'Original sweet and tangy recipe'),
    ('Strawberry Fizz', 6.50, 'Lemonade with fresh strawberries and bubbles'),
    ('Iced Tea', 4.00, 'Hand-brewed black tea with a hint of lemon'),
    ('Matcha refresher', 6.00, 'Ceremonial grade matcha whisked with cold honey and lime'),
    ('Sparkling water', 3.00, 'Crisp carbonated spring water with a fresh lemon twist'),
    ('Iced coffee', 3.50, 'Slow-steeped cold brew served over ice with optional cream'),
    ('Lavender Lemonade', 7.50, 'Classic lemonade infused with organic dried lavender and a hint of honey'),
    ('Minty Watermelon', 6.00, 'Fresh watermelon juice mixed with tart lemon and muddled garden mint')
) AS new_data(name, price, description)
WHERE NOT EXISTS (
    SELECT 1 FROM beverages
);