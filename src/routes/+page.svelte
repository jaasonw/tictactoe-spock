<script lang="ts">
  import Lobby from '$lib/lobby.svelte';
  import Login from '$lib/login.svelte';
  import { currentUser, logOut } from '$lib/pocketbase';
  console.log($currentUser);
</script>

{#if !$currentUser}
  <Login />
{:else}
  <Lobby />
{/if}
