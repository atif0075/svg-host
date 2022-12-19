<script>
  import { page } from "$app/stores";
  import { isUser } from "../lib/stores";
  import { beforeUpdate } from "svelte";
  let is_user = false;
  beforeUpdate(() => {
    isUser.subscribe((value) => {
      is_user = value;
    });
  });
  let logOut = () => {
    localStorage.removeItem("token");
    isUser.set(false);
  };

  let path;
  function getPath(currentPath) {
    path = currentPath;
  }
  $: getPath($page.url.pathname);
</script>

<main>
 
</main>

<style>
</style>
