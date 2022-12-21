<script>
  import supabase from "$lib/supabaseClient";
  import { goto } from "$app/navigation";
  import { isUser, user } from "$lib/stores";
  import { onMount } from "svelte";
  import Alert from "../../components/alert.svelte";
  import Loader from "../../components/loader.svelte";
  onMount(() => {
    isUser.subscribe((value) => {
      if (value) {
        goto("/");
      }
    });
  });
  let email = "";
  let password = "";
  let isShow = false;
  let isError = false;
  let isLoading = false;
  let msg = "";
  const singin = async () => {
    isLoading = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      isShow = true;
      isError = true;
      msg = error.message;
    } else {
      console.log(data);
      user.set(data.user);
      isShow = true;
      isError = false;
      msg = "You have successfully signed in.";
      setTimeout(() => {
        isUser.set(true);
        goto("/");
      }, 2000);
    }
    isLoading = false;
  };
</script>

<svelte:head>
  <title>Svg Hoster - Signin</title>
</svelte:head>
{#if isLoading}
  <Loader />
{/if}

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
 
      {#if isShow}
        <Alert {isError} {msg} />
      {/if}
    </div>
  </div>
</main>
