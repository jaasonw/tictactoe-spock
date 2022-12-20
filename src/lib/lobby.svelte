<script lang="ts">
  import { goto } from '$app/navigation';
  import { currentUser, logOut } from '$lib/pocketbase';
  import { gameId } from './game';
</script>

{#if $currentUser}
  <div
    class="bg-amber-100 outline outline-amber-900 outline-8 w-5/6 sm:w-2/5 p-5 flex flex-col justify-center items-center"
  >
    <form class="flex flex-col items-center gap-2" on:submit|preventDefault>
      <p class="text-m font-bold outline rounded outline-amber-900 w-64">
        Authenticated as: {$currentUser.email}
      </p>
      <button
        class="bg-white hover:bg-amber-900 text-amber-900 font-semibold hover:text-white py-1 px-4 border border-amber-900 hover:border-transparent rounded my-0 w-full m-0"
      >
        Create Room
      </button>
      <div class="text-xl">OR</div>
      <input
        type="text"
        bind:value={$gameId}
        class="rounded p-2 outline outline-amber-900 outline-2 w-full mx-0"
      />
      <input
        type="submit"
        value="Join with code"
        on:click={() => {
          goto('/game');
        }}
        class="bg-white hover:bg-amber-900 text-amber-900 font-semibold hover:text-white py-1 px-4 border border-amber-900 hover:border-transparent rounded my-0 w-full mx-0"
      />

      <button
        class="bg-white hover:bg-amber-900 text-amber-900 font-semibold hover:text-white py-1 px-4 border border-amber-900 hover:border-transparent rounded my-0 w-full mx-0 m-0 bg-transparent text-xs"
        on:click={logOut}
      >
        Logout
      </button>
    </form>
  </div>
{:else}
  <h1>Error: Not currently authenticated</h1>
{/if}
