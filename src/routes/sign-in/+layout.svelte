<script>
  import { createClient } from "@supabase/supabase-js";
  const supabase = createClient(supabase_url, anon_key);
</script>

<main>
  <slot />
</main>

<style>
</style>
