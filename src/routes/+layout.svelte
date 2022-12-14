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
  .bg {
    background: linear-gradient(
        327.21deg,
        rgba(33, 0, 75, 0.24) 3.65%,
        rgba(60, 0, 136, 0) 40.32%
      ),
      linear-gradient(
        245.93deg,
        rgba(209, 21, 111, 0.16) 0%,
        rgba(209, 25, 80, 0) 36.63%
      ),
      linear-gradient(
        147.6deg,
        rgba(58, 19, 255, 0) 29.79%,
        rgba(98, 19, 255, 0.01) 85.72%
      ),
      #13111c;
  }
</style>
