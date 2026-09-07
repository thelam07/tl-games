import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;

if (!url) throw new Error('Thieu SUPABASE_URL trong .env');
if (!key) throw new Error('Thieu SUPABASE_SERVICE_KEY trong .env');

export const supabase = createClient(url, key);