import { persistCookie } from "@macfja/svelte-persistent-store";
import { writable } from "svelte/store";

let isUser = persistCookie(writable(false), "is-user");
let user = persistCookie(writable(), "user");
let token = persistCookie(writable(""), "token");
let isSvgPublic = persistCookie(writable(true), "is-svg-public");
let allUsers = persistCookie(writable([]), "all-users");
let imgVal = persistCookie(
  writable("https://app.supabase.com/img/supabase-logo.svg"),
  "img-val"
);
export { isUser, user, token, isSvgPublic, allUsers, imgVal };
