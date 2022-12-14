<script>
  import Dropzone from "../layouts/Dropzone.svelte";
</script>

<main>
  <main
    class=" flex flex-col justify-center text-white items-center w-full min-h-screen mx-auto container"
  >
    <div class="w-full flex justify-end items-center px-4 py-5">
      <h1 class=" px-2 ">Make it public</h1>
      <label for="AcceptConditions" class="relative h-6 w-12 cursor-pointer">
        <input type="checkbox" id="AcceptConditions" class="peer sr-only" />
        <span
          class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-rose-500"
        />
        <span
          class="absolute inset-0 m-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-6"
        />
      </label>
    </div>

    <Dropzone />
  </main>
</main>

<style>
  .checked {
    color: red;
  }
</style>
