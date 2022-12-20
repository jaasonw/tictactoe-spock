<script lang="ts">
  import Lobby from "$lib/lobby.svelte";
  import Login from "$lib/login.svelte";
  import { currentUser } from "$lib/pocketbase";
</script>

{#if !$currentUser}
  <Login />
{:else}
  <Lobby />
{/if}
