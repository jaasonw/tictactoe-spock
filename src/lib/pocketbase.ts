import { PUBLIC_PB_URL } from "$env/static/public";
import PocketBase from "pocketbase";
import { writable } from "svelte/store";

export const pb = new PocketBase(PUBLIC_PB_URL);
pb.autoCancellation(false);

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange(() => {
  currentUser.set(pb.authStore.model);
});

export function logOut() {
  pb.authStore.clear();
}
