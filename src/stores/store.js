import { persist, createLocalStorage } from "@macfja/svelte-persistent-store";
import { writable } from "svelte/store";

const store = writable({ name: "John Doe" });

export const localStore = persist(store, createLocalStorage("store"));
export default store;
