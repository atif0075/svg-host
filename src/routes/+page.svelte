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
    class=" flex flex-col justify-center text-white items-center w-full min-h-screen mx-auto container"
  >
    <div class="w-full flex justify-end items-center px-4 py-5">
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text pr-3">
            {checked ? "It's Private Upload" : "It's Public Upload"}
          </span>
          <input
            bind:checked
            on:click={toggle}
            type="checkbox"
            class="toggle toggle-primary border-zinc-300 bg-zinc-400"
          />
        </label>
      </div>
    </div>

    <Dropzone />
  </main>
</main>

<style>
  .checked {
    color: red;
  }
</style>
