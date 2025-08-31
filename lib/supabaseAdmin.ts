// /lib/supabaseAdmin.ts
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE;

if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing");
if (!serviceRole) throw new Error("SUPABASE_SERVICE_ROLE is missing");

// 起動時に鍵が読めているか、先頭だけログ（本番は消す）
console.log("[supabase] url:", url);
console.log("[supabase] service role set:", !!serviceRole);

export const supabaseAdmin = createClient(url, serviceRole, {
  auth: { persistSession: false },
  db: { schema: "public" },
}); 