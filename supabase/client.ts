import { createClient } from '@supabase/supabase-js';

export const SUPABASE_DB_URL: string = "https://iotwlprsgduofjzickdl.supabase.co";
export const SUPABASE_DB_KEY: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvdHdscHJzZ2R1b2Zqemlja2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODI5MTUsImV4cCI6MjA3MjQ1ODkxNX0.YG8eZ6vCyZb5Ym7tG-kwVlow-jnSDVuwDEa1urUYwa4";
export const SUPABASE_DB_APP_KEY: string = "a0861bf7-2291-4bcc-9031-33ab5b415665";

export const supabase = createClient(
    SUPABASE_DB_URL,
    SUPABASE_DB_KEY
);