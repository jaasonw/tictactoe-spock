import PocketBase from "pocketbase";
import { writable } from "svelte/store";

export const pb = new PocketBase("https://cpsc349project4.fly.dev");
pb.autoCancellation(false);

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange(() => {
  currentUser.set(pb.authStore.model);
});

export function logOut() {
  pb.authStore.clear();
}
