<script>
  export let show, msg, type;
</script>

{#if show}
  <div class=" fixed  bottom-5 right-5 animate-fade  ">
    <div
      class="bg-zinc-900 border border-white border-opacity-20 rounded-lg shadow-lg p-4 {type ===
      'error'
        ? 'error'
        : 'success'}"
    >
      <h1 class="text-base font-normal text-center">{msg}</h1>
    </div>
  </div>
{/if}

<style>
  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .animate-fade {
    animation: fade 0.7s forwards;
  }
  .error {
    @apply text-rose-500;
  }
  .success {
    @apply text-green-500;
  }
</style>
