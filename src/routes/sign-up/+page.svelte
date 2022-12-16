<script>
  import supabase from "$lib/supabaseClient";
  import Toaster from "../../components/Toaster.svelte";
  let toastDetails = {
    show: false,
    msg: "",
    type: "",
  };
  let email = "";
  let full_name = "";
  let password = "";
  const submit = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
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
        msg: "You have successfully signed up.Please check your email to verify your account.",
      };
      setTimeout(() => {}, 4000);
    }
  };
</script>

<main class=" min-h-screen ">
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg text-center">
      <h1 class="text-2xl font-bold sm:text-3xl text-rose-500">
        Sign up to create your account
      </h1>
    </div>
    <Toaster {toastDetails} />

    <div class="mx-auto mt-8 mb-0 max-w-md space-y-4">
      <div>
        <label for="email" class="sr-only">Name</label>

        <div class="relative">
          <input
            type="text"
            bind:value={full_name}
            class="w-full bg-zinc-800 text-gray-100 rounded-lg outline-none border-gray-200 p-4 pr-12 text-sm shadow-sm"
            placeholder="Enter name"
          />
        </div>
      </div>
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
          All ready have account?
          <a
            class="underline hover:text-rose-500 duration-300 ease-in-out"
            href="/sign-in">Sign in</a
          >
        </p>

        <button
          on:click={submit}
          class="ml-3 inline-block rounded-lg bg-rose-500 px-5 py-3 text-sm font-medium text-white"
        >
          Sign up
        </button>
      </div>
    </div>
  </div>
</main>
