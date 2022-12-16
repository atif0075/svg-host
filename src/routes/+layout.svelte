<script>
  import "../app.css";
  import Navbar from "../layouts/Navbar.svelte";
</script>


<main class=" bg-black">
  <div
    class=" bg-opacity-20 backdrop-filter backdrop-blur-lg sticky top-0 left-0 z-10 border-b border-zinc-400 border-opacity-20"
  >
    <Navbar />
  </div>
  <slot />
</main>

<style>
</style>
