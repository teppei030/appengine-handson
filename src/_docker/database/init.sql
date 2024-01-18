-- テーブル作成
CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    detail VARCHAR(255) NOT NULL
);

-- 初期データ投入
INSERT INTO items (title, detail) VALUES
    ('Title1', 'Detail1'),
    ('Title2', 'Detail2');
