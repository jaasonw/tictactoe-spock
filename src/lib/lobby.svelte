<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentUser, logOut, pb } from "$lib/pocketbase";

  import { create2d, gameId } from "./game";

  // reset the game id when we come back here
  $gameId = "";
  const createRoom = async () => {
    const game = await pb.collection("games").create({
      board_state: JSON.stringify(create2d(3)),
      player_1: [$currentUser?.id],
      turn: "X",
    });
    $gameId = game.id;
    goto("/game");
  };

  const joinRoom = async () => {
    try {
      //if this works go to gameboard
      const game = await pb.collection("games").getOne($gameId);
      console.debug(`Joining room ${game.id}`);
      console.log(game);
      // room is not full
      if (game.player_2.length == 0 || game.player_1[0] == $currentUser?.id) {
        // check if player isnt already player 1
        if (game.player_1[0] != $currentUser?.id) {
          await pb.collection("games").update(game.id, {
            player_2: [$currentUser?.id],
          });
        }
        goto("/game");
      } else throw Error("Room is full");
    } catch (error) {
      alert(`An error occured while joining room: ${error}`);
    }
  };
</script>

{#if $currentUser}
  <div
    class="bg-amber-100 outline outline-amber-900 outline-8 w-5/6 sm:w-2/5 p-5 flex flex-col justify-center items-center"
  >
    <form class="flex flex-col items-center gap-2" on:submit|preventDefault>
      <p class="text-m font-bold">
        Authenticated as: {$currentUser.username}
      </p>
      <button
        on:click={createRoom}
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
        on:click={joinRoom}
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
