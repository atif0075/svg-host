<script>
  import supabase from "$lib/supabaseClient";
  import Toaster from "../../components/Toaster.svelte";
  import { isUser } from "$lib/stores";
  import { onMount } from "svelte";
  onMount(() => {
    isUser.subscribe((value) => {
      if (value) {
        window.location.href = "/";
      }
    });
  });
  let email = "";
  let password = "";
  let toastDetails = {
    show: false,
    msg: "",
    type: "",
  };
  const singin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
      // do a proper error handling
      toastDetails = {
        type: "error",
        show: true,
        msg: error.message,
      };
      setTimeout(() => {
        toastDetails = {
          show: false,
          msg: "",
          type: "",
        };
      }, 4000);
    } else {
      toastDetails = {
        type: "success",
        show: true,
        msg: "You have successfully signed in.",
      };
      setTimeout(() => {
        toastDetails = {
          show: false,
          msg: "",
          type: "",
        };
        isUser.set(true);
        window.location.href = "/";
      }, 2000);
    }
  };
</script>

<svelte:head>
  <title>Svg Hoster - Signin</title>
</svelte:head>

<Toaster {toastDetails} />
<main class=" min-h-screen ">
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg text-center">
      <h1 class="text-2xl font-bold sm:text-3xl text-primary">
        Sign in to your account
      </h1>
    </div>

    <div class="mx-auto mt-8 mb-0 max-w-md space-y-4">
      <div>
        <label for="email" class="sr-only">Email</label>

        <div class="relative">
          <input
            type="email"
            bind:value={email}
            class="w-full bg-zinc-800 text-gray-100 rounded-lg outline-none border-gray-200 p-4 pr-12 text-sm shadow-sm"
            placeholder="Enter email"
          />
        </div>
      </div>

      <div>
        <label for="password" class="sr-only">Password</label>
        <div class="relative">
          <input
            type="password"
            bind:value={password}
            class="w-full bg-zinc-800 text-gray-100 rounded-lg border-gray-200 outline-none p-4 pr-12 text-sm shadow-sm"
            placeholder="Enter password"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">
          No account?
          <a
            class="underline hover:text-primary duration-300 ease-in-out"
            href="/sign-up">Sign up</a
          >
        </p>

        <button
          type="button"
          on:click={singin}
          class="btn btn-primary text-sm font-bold text-neutral"
        >
          Sign in
        </button>
      </div>
    </div>
  </div>
</main>
