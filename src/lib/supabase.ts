import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://foojrcvrjtvjkcmblmvh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvb2pyY3ZyanR2amtjbWJsbXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMjQ2NTYsImV4cCI6MjA4MzkwMDY1Nn0.zqAOEbhGbep9254TDo6DhnnVqGyUzNsYfwF2hfw43BA';

export const supabase = createClient(supabaseUrl, supabaseKey);