<script>
  import Dropzone from "svelte-file-dropzone";
  import Toaster from "../components/Toaster.svelte";
  import supabase from "$lib/supabaseClient";
  let isError = false;
  let toastDetails = {
    show: true,
    type: "error",
    msg: "Only SVGs are allowed",
  };
  let files = {
    accepted: [],
    rejected: [],
  };
  let upload = async (event) => {
    const { data, error } = await supabase.storage
      .from("svg")
      .upload("test.svg", files.accepted[0]);
    if (files.rejected.length > 0) {
      isError = true;
      toastDetails = {
        show: true,
        type: "error",
        msg: "Only SVGs are allowed",
      };
      setTimeout(() => {
        isError = false;
      }, 4000);
      return;
    } else if (error) {
      console.log("error", error);
      isError = true;
      toastDetails = {
        show: true,
        type: "error",
        msg: error.message,
      };
      setTimeout(() => {
        isError = false;
      }, 4000);
      return;
    } else if (data) {
      isError = false;
      toastDetails = {
        show: true,
        type: "success",
        msg: "Bucket created",
      };
      setTimeout(() => {
        isError = false;
      }, 4000);
    }
  };
  let createBucket = async () => {
    const { data, error } = await supabase.storage.createBucket("svgs", {
      public: true,
    });
    if (data) {
      isError = false;
      console.log("res", data);
      toastDetails = {
        show: true,
        type: "success",
        msg: "Bucket created",
      };
      setTimeout(() => {
        isError = false;
      }, 4000);
    } else {
      isError = true;
      console.log("err", error);
      toastDetails = {
        show: true,
        type: "error",
        msg: err.message,
      };
      setTimeout(() => {
        isError = false;
      }, 4000);
    }
  };
  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
  }
  let uploadFile = async (event) => {
    const svgFile = event.target.files[0];
    const { data, error } = await supabase.storage
      .from("svg")
      .upload(`images/svg`, svgFile);
    if (error) {
      console.log("error", error);
      isError = true;
      toastDetails = {
        show: true,
        type: "error",
        msg: error.message,
      };
      setTimeout(() => {
        isError = false;
      }, 4000);
      return;
    } else if (data) {
      isError = false;
      toastDetails = {
        show: true,
        type: "success",
        msg: "SVG uploaded successfully",
      };
      setTimeout(() => {
        isError = false;
      }, 4000);
    }
  };
</script>

<main class="container mx-auto flex flex-col justify-center items-center ">
  <button on:click={createBucket} class=" btn btn-primary">
    Create Bucket
  </button>
  <input
    type="file"
    on:change={() => {
      uploadFile(event);
    }}
  />
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
  {#if isError}
    <Toaster {toastDetails} />
  {/if}
</main>
