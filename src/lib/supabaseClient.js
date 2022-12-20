import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_PUBLIC_SUPABASE_URL,
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
  {
    realtime: {
      params: {
        eventPerSecond: 100,
      },
    },
  }
);
export default supabase;
