<script>
  import "../app.css";
  import { page } from "$app/stores";
  import { isUser } from "../lib/stores";
  import supabase from "../lib/supabaseClient";
  import { beforeUpdate, onMount } from "svelte";
  import Toaster from "../components/Toaster.svelte";
  import Loader from "../components/loader.svelte";
  import Modal from "../components/modal.svelte";

  let is_user;
  beforeUpdate(() => {
    isUser.subscribe((value) => {
      is_user = value;
    });
  });
  onMount(() => {
    isUser.subscribe((value) => {
      if (value) {
        $page.url = "/";
      }
    });
  });
  let toastDetails = {
    show: false,
    isError: false,
    msg: "",
  };
  let isLoading = false;
  let logOut = async () => {
    isLoading = true;
    const { error } = await supabase.auth.signOut();
    if (error) {
      toastDetails = {
        show: true,
        isError: true,
        msg: error.message,
      };
      isLoading = false;
      setTimeout(() => {
        toastDetails = {
          show: false,
          isError: false,
          msg: "",
        };
      }, 2000);
    } else {
      localStorage.removeItem("token");
      isUser.set(false);
    }
    isLoading = false;
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
    {
      name: "Admin",
      path: "/admin",
    },
  ];
</script>

{#if toastDetails.show}
  <Toaster {toastDetails} />
{/if}
<main class=" bg-neutral">
  <div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <div class=" w-full px-2 min-h-screen relative">
        <slot />
        {#if isLoading}
          <Loader />
        {/if}
      </div>
      <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden"
        >Open sidebar</label
      >
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay" />
      <ul class="menu p-4 w-80  bg-base-100 text-base-content">
        {#if is_user}
          <div class="flex justify-center flex-col items-center">
            <div class="avatar online">
              <div class="w-24 rounded-full">
                <img src="https://placeimg.com/192/192/people" alt="" />
              </div>
            </div>
            <h1 class="font-bold text-xl py-1">M Atif</h1>
            <p>chatif476@gmail.com</p>
          </div>
        {/if}
        {#each routes as route}
          <li
            class="active:bg-[#2D2E31] rounded-lg my-1 {is_user &&
            route.name === 'Register'
              ? 'hidden'
              : ''} {is_user && route.name === 'Login' ? 'hidden' : ''}"
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
  <Modal />
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
        <button for="my-modal-4" on:click={logOut} class=" btn btn-error ml-3">
          <label for="my-modal-4"> Logout </label>
        </button>
      </div>
    </label>
  </label>
</main>

<style>
  :global(*::-webkit-scrollbar) {
    width: 0;
  }
</style>
