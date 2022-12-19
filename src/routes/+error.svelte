<script>
  import { onMount } from "svelte";

  let LottiePlayer;

  onMount(async () => {
    const module = await import("@lottiefiles/svelte-lottie-player");
    LottiePlayer = module.LottiePlayer;
  });
</script>

<main>
  {#if LottiePlayer}
    <LottiePlayer
      src="https://assets9.lottiefiles.com/packages/lf20_dc8o2lwo.json"
      loop={true}
      autoplay={true}
      renderer="svg"
      background="transparent"
      class="w-1/2 mx-auto"
    />
  {/if}
</main>
