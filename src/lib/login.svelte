<script lang="ts">
  import { pb } from './pocketbase';

  let email = '';
  let password = '';
  let errorMessage = '';

  async function login() {
    try {
      await pb.collection('users').authWithPassword(email, password);
    } catch (e) {
      errorMessage = `Failed authenticate: ${e}`;
      console.error(e);
    }
  }

  async function signUp() {
    try {
      await pb.collection('users').create({
        email: email,
        password: password,
        passwordConfirm: password,
      });
      await login();
    } catch (e) {
      errorMessage = `Failed authenticate: ${e}`;
      console.error(e);
    }
  }
</script>

<form
  class="flex flex-col justify-center items-center gap-2 text-center bg-amber-100 outline outline-amber-900 outline-8 w-5/6 sm:w-2/5 p-5 "
  on:submit|preventDefault
>
  <input
    class="rounded p-2 outline outline-amber-900 outline-2"
    placeholder="email"
    type="text"
    bind:value={email}
  />
  <input
    class="rounded p-2 outline outline-amber-900 outline-2"
    placeholder="password"
    type="text"
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
