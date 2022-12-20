<script lang="ts">
  import ctl from "@netlify/classnames-template-literals";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch("click", "button");
  }
  const classes = ctl(`
    flex
    justify-center
    items-center
    m-2
    bg-white
    text-3xl
    md:w-28
    md:h-28
    sm:w-20
    sm:h-20
    w-20
    h-20
    outline
    rounded
    btn-square
    outline-amber-900
    hover:outline-amber-900
    hover:outline-8
  `);
</script>

<button on:click={onClick} class={classes}>
  <slot />
</button>
