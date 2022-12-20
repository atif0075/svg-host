<script>
  import "../app.css";
  import { page } from "$app/stores";
  import { isUser } from "../lib/stores";
  import { beforeUpdate } from "svelte";
  let is_user;
  beforeUpdate(() => {
    isUser.subscribe((value) => {
      is_user = value;
    });
  });
  let logOut = () => {
    localStorage.removeItem("token");
    isUser.set(false);
  };
  let path;
  function getPath(currentPath) {
    path = currentPath;
  }
  $: getPath($page.url.pathname);
  let routes = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Your SVGs",
      path: "/your-svgs",
    },
    {
      name: "Public SVGs",
      path: "/public-svgs",
    },
    {
      name: "Settings",
      path: "/settings",
    },
    {
      name: "Login",
      path: "/sign-in",
    },
    {
      name: "Register",
      path: "/sign-up",
    },
  ];
</script>

<main class=" bg-neutral">
  <div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <div class=" w-full px-2 min-h-screen">
        <slot />
      </div>
      <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden"
        >Open sidebar</label
      >
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay" />
      <ul class="menu p-4 w-80  bg-base-100 text-base-content">
        {#each routes as route}
          <li
            class="active:bg-[#2D2E31] rounded-lg my-1 {is_user &&
            route.name === 'Register'
              ? 'disabled pointer-events-none'
              : ''} {is_user && route.name === 'Login'
              ? 'disabled pointer-events-none'
              : ''}"
          >
            <a href={route.path} class:active={path === route.path}>
              {route.name}
            </a>
          </li>
        {/each}
        {#if is_user}
          <label for="my-modal-4" class="btn  btn-error cursor-pointer">
            Logout
          </label>
        {/if}
      </ul>
    </div>
  </div>
  <input type="checkbox" id="my-modal-4" class="modal-toggle" />
  <label for="my-modal-4" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
      <h3 class="text-lg font-bold">Are you sure you want to log out?</h3>
      <p class="py-4">
        You will be logged out of your account. You can log back in at any time.
        Your session will be cleared.
      </p>
      <div>
        <label for="my-modal-4" class=" btn btn-neutral border border-zinc-600">
          <span> Cancel </span>
        </label>
        <label for="my-modal-4" class=" btn btn-error ml-3">
          <label for="my-modal-4" href="/" on:click={logOut}> Logout </label>
        </label>
      </div>
    </label>
  </label>
</main>

<style>
</style>
