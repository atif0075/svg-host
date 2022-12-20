<script>
  import supabase from "$lib/supabaseClient";
  import { goto } from "$app/navigation";
  import { isUser } from "$lib/stores";
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
  let githubSignin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      isShow = true;
      isError = true;
      msg = error.message;
    } else {
      isShow = true;
      isError = false;
      msg = "You have successfully signed in.";
      setTimeout(() => {
        isUser.set(true);
        goto("/");
      }, 2000);
    }
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
      <div>
        <button
          type="button"
          on:click={githubSignin}
          class="btn btn-neutral text-white w-full text-sm font-bold border border-gray-200 border-opacity-10"
        >
          Sign in with Github
          <svg
            viewBox="0 0 16 16"
            class="w-5 h-5 ml-2"
            fill="currentColor"
            aria-hidden="true"
            ><path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            /></svg
          >
        </button>
      </div>
      {#if isShow}
        <Alert {isError} {msg} />
      {/if}
    </div>
  </div>
</main>
