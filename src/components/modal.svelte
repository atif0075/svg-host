<script>
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
  } from "@rgossiaux/svelte-headlessui";
  export let isOpen = false,
    title = "Hi",
    content = "Hello this is modal",
    closeModal = () => {
      isOpen = false;
    },
    buttons = [
      {
        text: "Got it, thanks!",
        type: "btn btn-primary",
        action: () => {
          isOpen = false;
        },
      },
      {
        text: "Cancel",
        type: "btn btn-ghost border border-gray-300 text-gray-700",
        action: () => {
          isOpen = false;
        },
      },
    ];
  import { fly } from "svelte/transition";
  let openModal = () => {
    isOpen = true;
  };
</script>

<Dialog class="relative z-10" open={isOpen} on:close={closeModal}>
  <div class="fixed inset-0 overflow-y-auto">
    <div class="flex min-h-full items-center justify-center p-4 text-center">
      <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
      <div
        transition:fly={{ x: 0, y: 10, duration: 300 }}
        id="modal"
        class="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all"
      >
        <DialogTitle
          as="h3"
          class="text-lg font-medium leading-6 text-gray-100"
        >
          {@html title}
        </DialogTitle>
        <div class="mt-2">
          <p class="text-sm text-gray-300">
            {content}
          </p>
        </div>

        <div class="mt-4">
          {#each buttons as button, index}
            <button
              type="button"
              class="{index === 1 ? 'ml-3' : ''} {button.type}"
              on:click={button.action}
            >
              {button.text}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</Dialog>
