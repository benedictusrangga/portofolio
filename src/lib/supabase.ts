import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://foojrcvrjtvjkcmblmvh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvb2pyY3ZyanR2amtjbWJsbXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4MjU0NzQsImV4cCI6MjA1MjQwMTQ3NH0.vlSDd9Pz-PkIPIUc4xBTbw_TIyX8BS_';

export const supabase = createClient(supabaseUrl, supabaseKey);