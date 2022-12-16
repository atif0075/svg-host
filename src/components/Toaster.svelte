<script>
  export let show, msg;
</script>

{#if show}
  <div class=" fixed  bottom-5 right-5  ">
    <div class="bg-white rounded-lg shadow-lg p-4">
      <h1 class="text-xl font-bold text-center">{msg}</h1>
    </div>
  </div>
{/if}

<style>
</style>
