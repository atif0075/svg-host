<script>
  import Dropzone from "../layouts/Dropzone.svelte";
  import { isSvgPublic } from "$lib/stores";
  import { onMount } from "svelte";
  let checked = false;
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
      <h1 class=" px-2 ">Make it public</h1>
      <input
        type="checkbox"
        bind:checked
        on:click={toggle}
        class="toggle toggle-error bg-zinc-300 checked:bg-rose-600 border-zinc-300"
      />
    </div>

    <Dropzone />
  </main>
</main>

<style>
  .checked {
    color: red;
  }
</style>
