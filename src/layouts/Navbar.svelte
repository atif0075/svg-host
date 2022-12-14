<script>
  import { page } from "$app/stores";
  let path;
  function getPath(currentPath) {
    path = currentPath;
  }

  $: getPath($page.url.pathname);
</script>

<main>
  <nav
    aria-label="Site Nav"
    class=" flex items-center justify-between container p-4 mx-auto"
  >
    <a
      href="/"
      class=" px-4 py-2 font-semibold !bg-rose-500 !text-white rounded-lg"
    >
      SVG Hoster
    </a>

    <ul class="flex items-center gap-2 text-sm font-medium text-gray-500">
      <li class="lg:block hidden">
        <a class:active={path === "/"} class="px-3 py-2 rounded-lg transition-all ease-in-out duration-300 hover:text-rose-600" href="/">
          Home
        </a>
      </li>

      <li>
        <a
          class:active={path === "/saved-svg"}
          class="px-3 py-2 rounded-lg transition-all ease-in-out duration-300 hover:text-rose-600"
          href="/saved-svg"
        >
          Your SVGs
        </a>
      </li>
    </ul>
  </nav>
</main>

<style>

</style>
