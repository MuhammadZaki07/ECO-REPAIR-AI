import { ENV } from "@/env";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = ENV.SUPABASE_URL!;
const supabaseAnonKey = ENV.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
  },
});
