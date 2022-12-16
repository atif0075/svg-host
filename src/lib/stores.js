import { persistCookie } from "@macfja/svelte-persistent-store";
import { writable } from "svelte/store";

let isUser = persistCookie(writable(false), "is-user");
let user = persistCookie(writable({}), "user");
let token = persistCookie(writable(""), "token");
let isSvgPublic = persistCookie(writable(true), "is-svg-public");

export { isUser, user, token, isSvgPublic };
