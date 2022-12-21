<script>
  import Dropzone from "../layouts/Dropzone.svelte";
  import { isSvgPublic } from "$lib/stores";
  import { onMount } from "svelte";
  let checked;
  onMount(() => {
    isSvgPublic.subscribe((value) => {
      checked = value;
    });
  });
  let toggle = () => {
    isSvgPublic.update((value) => !value);
  };
</script>

<svelte:head>
  <title>Svg Hoster - Home</title>
</svelte:head>
<main>
  <main
    class=" flex justify-center text-white items-center w-full min-h-screen p-2"
  >
    <div class="w-[70%] flex justify-end items-center">
      <Dropzone />
    </div>
    <div class="w-[30%] h-screen p-2">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">
        <span class="label-text">Upload Type - Default(Public)</span>
      </label>
      <select class="select select-primary w-full max-w-xs">
        <option selected>Public</option>
        <option>Private</option>
      </select>
      <div class="form-control w-full max-w-xs">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
          <span class="label-text">Category</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control w-full max-w-xs">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
          <span class="label-text">Preview Box</span>
        </label>
        <div
          class=" w-full min-h-[200px] border rounded-lg border-gray-100 border-opacity-20 p-5 flex justify-center items-center"
        >
          <img
            class=" w-28 h-28"
            src="https://app.supabase.com/img/supabase-logo.svg"
            alt=""
          />
        </div>
      </div>
      <div class=" py-2">
        <button class=" w-full btn btn-primary">Upload</button>
      </div>
    </div>
  </main>
</main>

<style>
  .checked {
    color: red;
  }
</style>
