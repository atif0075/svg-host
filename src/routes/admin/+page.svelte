<script>
  import supabase from "../../lib/supabaseClient";
  import { onMount } from "svelte";
  import Toaster from "../../components/Toaster.svelte";
  import Loader from "../../components/loader.svelte";
  let isLoading = false;
  let userList = [];
  let toastDetails = {
    show: false,
    msg: "",
    type: "",
  };

  onMount(async () => {
    isLoading = true;
    const { data, error } = await supabase.from("user").select();
    if (error) {
      toastDetails = {
        show: true,
        msg: error.message,
        type: "error",
      };
      setTimeout(() => {
        toastDetails = {
          show: false,
          msg: "",
          type: "",
        };
      }, 4000);
    } else {
      userList = data;
      console.log("data", data);
      toastDetails = {
        show: true,
        msg: "Users loaded successfully",
        type: "success",
      };
      setTimeout(() => {
        toastDetails = {
          show: false,
          msg: "",
          type: "",
        };
      }, 4000);
    }
    isLoading = false;
  });
  let deleteUser = async (id) => {
    isLoading = true;
    supabase
      .from("user")
      .delete()
      .eq("id", id)
      .then((res) => {
        console.log("res", res);
        if (res.error) {
          isLoading = false;
          toastDetails = {
            show: true,
            msg: res.error.message,
            type: "error",
          };
          setTimeout(() => {
            toastDetails = {
              show: false,
              msg: "",
              type: "",
            };
          }, 4000);
        } else {
          isLoading = false;
          toastDetails = {
            show: true,
            msg: "User deleted successfully",
            type: "success",
          };
          setTimeout(() => {
            toastDetails = {
              show: false,
              msg: "",
              type: "",
            };
          }, 4000);
          userList = userList.filter((u) => u.id !== id);
          isLoading = false;
        }
      });
  };
  let selectAll = (e) => {
    userList = userList.map((user) => {
      user.checked = e.target.checked;
      return user;
    });
  };
  let isTableLoading = false;
  let filterRes = async (e) => {
    isTableLoading = true;
    await supabase
      .from("user")
      .select()
      .ilike("full_name", `%${e.target.value}%`)
      .then((res) => {
        console.log("res", res);
        if (res.error) {
          isTableLoading = false;
          toastDetails = {
            show: true,
            msg: res.error.message,
            type: "error",
          };
          setTimeout(() => {
            toastDetails = {
              show: false,
              msg: "",
              type: "",
            };
          }, 4000);
        } else {
          isTableLoading = false;
          userList = res.data;
        }
      });
  };
  isTableLoading = false;
</script>

{#if toastDetails.show}
  <Toaster {toastDetails}  />
{/if}
<main class=" p-5">
  <div class=" py-2">
    <h1 class=" font-semibold text-2xl pb-2">All Users</h1>
    <input
      type="text"
      placeholder="Type here"
      on:keyup={(e) => filterRes(e)}
      class="input input-bordered input-success w-full max-w-xs"
    />
  </div>
  <div class="overflow-x-auto w-full relative z-[1]">
    {#if isTableLoading}
      <Loader />
    {/if}
    <table class="table w-full">
      <thead>
        <tr>
          <th>
            <label>
              <input
                on:change={(e) => selectAll(e)}
                type="checkbox"
                class="checkbox"
              />
            </label>
          </th>
          <th>Avatar</th>
          <th>Name</th>
          <th>Email</th>
          <th>UUID</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {#each userList as user (user.id)}
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
                <div class="font-semibold text-primary">
                  {user.full_name}
                </div>
              </div>
            </td>
            <td> {user.email} </td>
            <td>
              {user.uuid}
            </td>
            <th>
              <button on:click={deleteUser(user.id)} class="badge badge-error"
                >Delete</button
              >
            </th>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>
{#if isLoading}
  <Loader />
{/if}
