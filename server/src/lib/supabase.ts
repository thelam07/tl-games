import { createClient } from '@supabase/supabase-js';
import { env } from './env';

// Client nay dung SERVICE ROLE key -> bo qua Row Level Security.
// Vi vay CHI duoc dung o server, khong bao gio gui key nay xuong trinh duyet.
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});
