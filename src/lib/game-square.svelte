<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch('click', 'button');
  }
</script>

<button
  on:click={onClick}
  class="flex justify-center items-center m-2 bg-white text-3xl w-28 h-28 outline rounded btn-square outline-amber-900 hover:outline-amber-900 hover:outline-8"
>
  <slot />
</button>
