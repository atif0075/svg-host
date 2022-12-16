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
            href="/"
            class:active={path === "/"}
            class="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-rose-700 duration-300 ease-in-out"
          >
            Home
          </a>
          <a
            href="/saved-svg"
            class:active={path === "/saved-svg"}
            class="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-rose-700 duration-300 ease-in-out"
          >
            SVG's
          </a>
        </nav>

        <div class="ml-8 flex items-center">
          <div
            class="flex items-center divide-x divide-zinc-100 divide-opacity-10 border-x border-zinc-100 border-opacity-10"
          >
            <span>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://github.com/atif0075/svg-hoster"
                class="block border-b-4 border-transparent p-6 text-zinc-500 hover:border-rose-700"
              >
                <svg
                  viewBox="0 0 16 16"
                  class="w-6 h-6"
                  fill="currentColor"
                  aria-hidden="true"
                  ><path
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  /></svg
                >
              </a>
            </span>

            <span>
              <a
                href="/sign-in"
                class:active={path === "/sign-in" || path === "/sign-up"}
                class="block border-b-4 border-transparent p-6 text-zinc-500 hover:border-rose-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 {path === '/sign-in' || path === '/sign-up'
                    ? 'text-rose-700'
                    : 'text-zinc-500'}"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </a>
            </span>

            <span class="hidden sm:block">
              <a
                href="/search"
                class="block border-b-4 border-transparent text-zinc-500 p-6 hover:border-rose-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
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
