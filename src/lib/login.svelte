<script lang="ts">
  import { ClientResponseError } from "pocketbase";

  import Logo from "./logo.svelte";
  import { pb } from "./pocketbase";

  let username = "";
  let password = "";
  let errorMessage = "";

  async function login() {
    try {
      await pb.collection("users").authWithPassword(username, password);
    } catch (e) {
      errorMessage = `Failed to authenticate: Invalid username or password`;
      console.error(e);
    }
  }

  async function signUp() {
    try {
      await pb.collection("users").create({
        username: username,
        password: password,
        passwordConfirm: password,
      });
      await login();
    } catch (e: unknown) {
      if (!(e instanceof ClientResponseError)) return;
      if ("username" in e.data.data)
        errorMessage = `Invalid username: ${e.data.data.username.message}`;
      else if ("password" in e.data.data)
        errorMessage = `Invalid password: ${e.data.data.password.message}`;
      else
        errorMessage = `Failed to create account: ${e.data.data.name.message}`;
      console.error(e.data.data);
    }
  }
</script>

<form
  class="flex flex-col justify-center items-center gap-2 text-center bg-amber-100 outline outline-amber-900 outline-8 w-5/6 sm:w-2/5 p-5 "
  on:submit|preventDefault
>
  <Logo />
  <input
    class="rounded p-2 outline outline-amber-900 outline-2"
    placeholder="username"
    type="text"
    bind:value={username}
  />
  <input
    class="rounded p-2 outline outline-amber-900 outline-2"
    placeholder="password"
    type="password"
    bind:value={password}
  />
  <button
    class="bg-white hover:bg-amber-900 text-amber-900 font-semibold hover:text-white m-4 py-1 px-4 border border-amber-900 hover:border-transparent rounded my-0"
    on:click={login}>Login</button
  >
  <button
    class="bg-white hover:bg-amber-900 text-amber-900 font-semibold hover:text-white m-4 py-1 px-4 border border-amber-900 hover:border-transparent rounded my-0"
    on:click={signUp}>Sign up</button
  >
  <p class="text-red-500">{errorMessage}</p>
</form>
