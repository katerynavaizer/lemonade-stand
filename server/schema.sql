-- 1. Create the Beverages Table
CREATE TABLE beverages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    is_available BOOLEAN DEFAULT TRUE
);

-- 2. Create the Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    order_items JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Initial "Seed" Data (Optional but helpful)
INSERT INTO beverages (name, price, description) VALUES 
('Classic Lemonade', 5.00, 'Original sweet and tangy recipe'),
('Strawberry Fizz', 6.50, 'Lemonade with fresh strawberries and bubbles'),
('Iced Tea', 4.00, 'Hand-brewed black tea with a hint of lemon'),
('Matcha refresher', 6.00, 'Ceremonial grade matcha whisked with cold honey and lime'),
('Sparkling water', 3.00, 'Crisp carbonated spring water with a fresh lemon twist'),
('Iced coffee', 3.50, 'Slow-steeped cold brew served over ice with optional cream');