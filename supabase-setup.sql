-- SQL untuk membuat table analytics di Supabase
-- Jalankan di Supabase SQL Editor

CREATE TABLE analytics (
  id SERIAL PRIMARY KEY,
  device_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional)
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create policy untuk allow insert dan select
CREATE POLICY "Allow public insert" ON analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON analytics FOR SELECT USING (true);