<script>
  import Dropzone from "svelte-file-dropzone";
  import Toaster from "../components/Toaster.svelte";
  import supabase from "$lib/supabaseClient";
  import { imgVal } from "../lib/stores";
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
    files.accepted = files.accepted.slice(0, 1);
    const reader = new FileReader();
    reader.onload = (e) => {
      imgVal = e.target.result; 
    };
    reader.readAsDataURL(files.accepted[0]);
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

<img src={imgVal} class=" w-10" alt="name" />
<main
  class="container mx-auto min-h-screen flex flex-col justify-center items-center "
>
  <Dropzone
    accept="image/svg+xml"
    disableDefaultStyles={true}
    maxFiles={1}
    containerClasses=" w-full min-h-screen  flex justify-center items-center bg-[#2e2e2e] border border-dashed border-primary border-opacity-30 rounded-lg text-primary text-xl font-semibold cursor-pointer"
    on:drop={handleFilesSelect}
  >
    Select or Drop SVGs here
  </Dropzone>

  {#if isError}
    <Toaster {toastDetails} />
  {/if}
</main>
