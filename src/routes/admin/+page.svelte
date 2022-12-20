<script>
  import supabase from "../../lib/supabaseClient";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Toaster from "../../components/Toaster.svelte";
  import { allUsers } from "../../lib/stores";

  let toastDetails = {
    show: false,
    msg: "",
    type: "",
  };

  onMount(async () => {
    // const { data, error } = await supabase.from("user").select();
    // if (error) {
    //   toastDetails = {
    //     show: true,
    //     msg: error.message,
    //     type: "error",
    //   };
    //   setTimeout(() => {
    //     toastDetails = {
    //       show: false,
    //       msg: "",
    //       type: "",
    //     };
    //   }, 4000);
    // } else {
    //   allUsers = data;
    //   console.log("data", data);
    //   toastDetails = {
    //     show: true,
    //     msg: "Users loaded successfully",
    //     type: "success",
    //   };
    //   setTimeout(() => {
    //     toastDetails = {
    //       show: false,
    //       msg: "",
    //       type: "",
    //     };
    //   }, 4000);
    // }
    // watch for realtime updates on * from the user table
    const { data: realtimeData, error: realtimeError } = supabase
      .from("user")
      .on("INSERT", (payload) => {
        console.log("realtimeData", payload);
        allUsers = [...allUsers, payload.new];
      })
      .on("UPDATE", (payload) => {
        console.log("realtimeData", payload);
        allUsers = allUsers.map((user) => {
          if (user.id === payload.new.id) {
            return payload.new;
          }
          return user;
        });
      })
      .on("DELETE", (payload) => {
        console.log("realtimeData", payload);
        allUsers = allUsers.filter((user) => user.id !== payload.old.id);
      })
      .subscribe();
   
  });
</script>

{#if toastDetails.show}
  <Toaster {toastDetails} />
{/if}
<main class=" p-5">
  <h1 class=" font-semibold text-2xl pb-2">All Users</h1>
  <div class="overflow-x-auto w-full">
    <table class="table w-full">
      <thead>
        <tr>
          <th>
            <label>
              <input
                on:change={(e) => {
                  allUsers.map((user) => {
                    user.checked = e.target.checked;
                    return user;
                  });
                }}
                type="checkbox"
                class="checkbox"
              />
            </label>
          </th>
          <th>Avatar</th>
          <th>Name</th>
          <th>Email</th>
          <th>UUID</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <!-- {#each allUsers as user (user.id)}
          <tr>
            <th>
              <label>
                <input
                  bind:checked={user.checked}
                  type="checkbox"
                  class="checkbox"
                />
              </label>
            </th>
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div
                    class=" w-12 h-12 mask mask-squircle bg-neutral 
                    {user.avatar ? '' : 'p-2'}"
                  >
                    <img
                      src={user.avatar
                        ? user.avatar
                        : "https://app.supabase.com/img/supabase-logo.svg"}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div>
                <div class="font-bold">
                  {user.full_name}
                </div>
              </div>
            </td>
            <td> {user.email} </td>
            <td>
              {user.uuid}
            </td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
        {/each} -->
      </tbody>
    </table>
  </div>
</main>
