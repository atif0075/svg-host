<script>
  import Dropzone from "svelte-file-dropzone";
  let files = {
    accepted: [
      {
        name: "test.svg",
        type: "image/svg+xml",
        size: 123,
        lastModified: 123,
        webkitRelativePath: "",
      },
    ],
    rejected: [],
  };
  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
  }
</script>

<main class="container mx-auto flex flex-col justify-center items-center ">
  <Dropzone
    accept="image/svg+xml"
    disableDefaultStyles={true}
    containerClasses=" w-full  flex justify-center min-h-[300px] items-center bg-[#111111] border border-dashed border-rose-500 border-opacity-30 rounded-lg text-rose-500 text-xl font-semibold cursor-pointer"
    on:drop={handleFilesSelect}
  >
    Select or Drop SVGs here
  </Dropzone>
  <ol class=" py-5 w-full  grid lg:grid-cols-4 gap-5 ">
    {#each files.accepted as item}
      <li
        class=" w-full py-4 px-2 text-rose-400  rounded-lg my-2 bg-zinc-800 border border-rose-300 border-opacity-30"
      >
        {item.name.length > 30 ? item.name.slice(0, 30) + "...." : item.name}
      </li>
    {/each}
  </ol>
</main>
