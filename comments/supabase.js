import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://jmsdhnhascomfrfoqcjf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptc2Robmhhc2NvbWZyZm9xY2pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MjAwODgsImV4cCI6MjA4MjI5NjA4OH0.YfgAL0BV3petkiANDbE0ZOrCl9fgOb3e4Dw4prSgbUs"
);
