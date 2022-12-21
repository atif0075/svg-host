<script>
  import supabase from "../../lib/supabaseClient";
  import { onMount } from "svelte";
  import Loader from "../../components/loader.svelte";
  import Modal from "../../components/modal.svelte";
  let isLoading = false;
  let userList = [];
  onMount(async () => {
    isLoading = true;
    const { data, error } = await supabase.from("user").select();
    if (error) {
      console.log("error", error);
    } else {
      userList = data;
      userList = userList.map((user) => {
        user.isOpen = false;
        return user;
      });
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
        } else {
          userList = userList.filter((u) => u.id !== id);
          isLoading = false;
        }
      });
  };
  let deleteAll = async () => {
    isLoading = true;
    let allIDs = userList.filter((u) => u.checked).map((u) => u.id);
    console.log("allIDs", allIDs);
    allIDs.forEach((id) => {
      supabase
        .from("user")
        .delete()
        .eq("id", id)
        .then((res) => {
          console.log("res", res);
          if (res.error) {
            isLoading = false;
          } else {
            userList = userList.filter((u) => u.id !== id);
            isLoading = false;
          }
        });
    });
    isLoading = false;
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
          console.log("error", res.error);
        } else {
          userList = res.data;
          userList = userList.map((user) => {
            user.isOpen = false;
            return user;
          });
        }
      });
    isTableLoading = false;
  };
</script>

<main class=" p-5">
  <div class=" py-2">
    <h1 class=" font-semibold text-2xl pb-2">All Users</h1>
    <div class=" flex justify-start items-start">
      <input
        type="text"
        placeholder="Type here"
        on:keyup={(e) => filterRes(e)}
        class="input input-bordered input-success w-full max-w-xs"
      />
      {#if userList.filter((u) => u.checked).length > 0}
        <button on:click={deleteAll} class=" btn btn-error mx-3">
          Delete Selected
        </button>
      {/if}
    </div>
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
              <button
                on:click={() => {
                  user.isOpen = !user.isOpen;
                }}
                class="badge badge-error">Delete</button
              >
            </th>
            <Modal
              isOpen={user.isOpen}
              title="Delete User <span class='text-error'> {user.full_name} </span> ?"
              content="Are you sure you want to delete this user? This action cannot be undone. All of the user's data will be permanently removed from our database."
              closeModal={() => {
                user.isOpen = false;
              }}
              buttons={[
                {
                  text: "Cancel",
                  type: "btn btn-ghost border border-gray-700 text-gray-100",
                  action: () => {
                    user.isOpen = false;
                  },
                },
                {
                  text: "Delete",
                  type: "btn btn-error",
                  action: () => {
                    user.isOpen = false;
                    deleteUser(user.id);
                  },
                },
              ]}
            />
          </tr>
        {/each}
      </tbody>
    </table>
    {#if userList.length === 0 && !isTableLoading && !isLoading}
      <div class=" w-full">
        <div class="alert alert-info shadow-lg rounded-lg w-full">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="stroke-current flex-shrink-0 w-6 h-6"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              /></svg
            >
            <span>Sorry, No data available with this query</span>
          </div>
        </div>
      </div>
    {/if}
  </div>
</main>
{#if isLoading}
  <Loader />
{/if}
