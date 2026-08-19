import 'dotenv/config';
import { z } from 'zod';

// Doc bien moi truong 1 lan, kiem tra ngay luc khoi dong.
// Thieu bien -> server bao loi ro rang, khong chay nua roi loi mo ho o giua chung.
const schema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_KEY: z.string().min(20),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default('7d'),
  PORT: z.coerce.number().default(3000),
  CLIENT_ORIGIN: z.string().default('http://localhost:5173'),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Thieu / sai bien moi truong trong file .env:');
  for (const issue of parsed.error.issues) {
    console.error(`   - ${issue.path.join('.')}: ${issue.message}`);
  }
  console.error('👉 Xem lai server/.env.example de biet can nhung bien gi.');
  process.exit(1);
}

export const env = parsed.data;
