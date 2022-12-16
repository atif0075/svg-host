<script>
  import { page } from "$app/stores";
  let path;
  function getPath(currentPath) {
    path = currentPath;
  }

  $: getPath($page.url.pathname);
</script>

<main>
  <header
    aria-label="Site Header"
    class="border-b border-zinc-100 border-opacity-10"
  >
    <div
      class="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8"
    >
      <div class="flex items-center">
        <button type="button" class="p-2 sm:mr-4 lg:hidden">
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <a href="/" class="text-white font-semibold">
          <span class="inline-block px-4 py-2.5 rounded-lg bg-rose-500"
            >Svg Hoster</span
          >
        </a>
      </div>

      <div class="flex flex-1 items-center justify-end">
        <nav
          aria-label="Site Nav"
          class="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-zinc-500"
        >
          <a
            href="/about"
            class="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-rose-700"
          >
            About
          </a>
        </nav>

        <div class="ml-8 flex items-center">
          <div
            class="flex items-center divide-x divide-zinc-100 divide-opacity-10 border-x border-zinc-100 border-opacity-10"
          >
            <span>
              <a
                href="/cart"
                class="block border-b-4 border-transparent p-6 text-zinc-500 hover:border-rose-700"
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>

                <span class="sr-only">Cart</span>
              </a>
            </span>

            <span>
              <a
                href="/sign-in"
                class="block border-b-4 border-transparent p-6 text-zinc-500 hover:border-rose-700"
              >
                <svg
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>

                <span class="sr-only"> Account </span>
              </a>
            </span>

            <span class="hidden sm:block">
              <a
                href="/search"
                class="block border-b-4 border-transparent text-zinc-500 p-6 hover:border-rose-700"
              >
                <svg
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

                <span class="sr-only"> Search </span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
</main>

<style>
</style>
