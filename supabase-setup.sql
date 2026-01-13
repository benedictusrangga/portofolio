-- SQL untuk membuat table analytics di Supabase
-- Jalankan di Supabase SQL Editor

CREATE TABLE analytics (
  id SERIAL PRIMARY KEY,
  device_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS untuk public access
ALTER TABLE analytics DISABLE ROW LEVEL SECURITY;