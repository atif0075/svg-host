<script>
</script>

<main class=" min-h-screen ">
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg text-center">
      <h1 class="text-2xl font-bold sm:text-3xl text-rose-500">
        Sign up to create your account
      </h1>
    </div>

    <form class="mx-auto mt-8 mb-0 max-w-md space-y-4">
      <div>
        <label for="email" class="sr-only">Email</label>

        <div class="relative">
          <input
            type="email"
            class="w-full rounded-lg outline-none border-gray-200 p-4 pr-12 text-sm shadow-sm"
            placeholder="Enter email"
          />
        </div>
      </div>

      <div>
        <label for="password" class="sr-only">Password</label>
        <div class="relative">
          <input
            type="password"
            class="w-full rounded-lg border-gray-200 outline-none p-4 pr-12 text-sm shadow-sm"
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
          type="submit"
          class="ml-3 inline-block rounded-lg bg-rose-500 px-5 py-3 text-sm font-medium text-white"
        >
          Sign up
        </button>
      </div>
    </form>
  </div>
</main>
