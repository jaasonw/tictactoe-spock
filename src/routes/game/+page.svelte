<script lang="ts">
  import { goto } from "$app/navigation";
  import { checkWin, create2d, gameId, index1d, isFilled } from "$lib/game";
  import GameSquare from "$lib/game-square.svelte";
  import Logo from "$lib/logo.svelte";
  import { currentUser, pb } from "$lib/pocketbase";
  import { onDestroy, onMount } from "svelte";

  let board: string[][] = create2d(3);
  let start = "X";
  let turn = "X";
  let winner: string | null = null;
  let unsubscribe: () => void;

  const toggleTurn = () => {
    turn = turn == "X" ? "O" : "X";
  };

  const toggleStart = () => {
    start = start == "X" ? "O" : "X";
  };

  const updateTile = async (i: number, j: number) => {
    const gameState = await getGameState();
    if (turn == "X" && gameState.player_1[0] != pb.authStore.model?.id) return;
    if (turn == "O" && gameState.player_2[0] != pb.authStore.model?.id) return;
    if (!isFilled(board) && winner == null && !board[i][j]) {
      board[i][j] = turn;
      toggleTurn();
      uploadGameState();
    }
  };

  const getGameState = async () => {
    return await pb.collection("games").getOne($gameId);
  };

  const uploadGameState = async () => {
    pb.collection("games").update($gameId, {
      turn: turn,
      board_state: JSON.stringify(board),
    });
  };

  const reset = () => {
    board = create2d(3);
    toggleStart();
    turn = start;
    winner = null;
    uploadGameState();
  };

  onMount(async () => {
    if (!$currentUser) {
      goto("/");
    }

    const state: any = await getGameState();
    board = JSON.parse(state.board_state);
    turn = state.turn;

    unsubscribe = await pb.collection("games").subscribe($gameId, function (e) {
      board = JSON.parse(e.record.board_state);
      turn = e.record.turn;
    });
  });

  // check for win or tie every state change
  $: {
    const win = checkWin(board);
    winner = win;
    if (win) alert(`${win} is the winner`);
    else if (isFilled(board)) alert("Tie");
  }

  // clean up when navigate to a different page
  onDestroy(() => {
    unsubscribe?.();
  });
</script>

<div class="flex justify-center items-center content-center w-9/12 bg-cyan-700">
  <div
    class="bg-amber-100 outline outline-amber-900 outline-8 text-center w-5/6 sm:w-2/3"
  >
    <Logo />
    <br />
    <div class="flex flex-col items-center">
      <p class="text-m font-bold outline rounded outline-amber-900 w-64 m-1">
        Authenticated as: {$currentUser?.username}
      </p>
      <p class="text-m font-bold outline rounded outline-amber-900 w-64 m-1">
        Tap a box to start the game
      </p>
      <p class="text-m font-bold outline rounded outline-amber-900 w-64 m-1">
        Current Player: <span id="currentPlayer">{turn}</span>
      </p>
      <p class="text-m font-bold outline rounded outline-amber-900 w-64 m-1">
        Join Code: <span id="gameId">{$gameId}</span>
      </p>
    </div>
    <div class="flex justify-center">
      <div
        id="game-grid"
        class="grid grid-cols-3 w-96 content-center justify-items-center"
      >
        {#each [...Array(9).keys()] as e}
          <GameSquare
            on:click={() => {
              const [i, j] = index1d(e);
              updateTile(i, j);
            }}>{board[index1d(e)[0]][index1d(e)[1]]}</GameSquare
          >
        {/each}
      </div>
    </div>

    <!-- Grid end here  -->
    <br />
    <!-- Button to reset game -->
    <button
      id="but"
      on:click={reset}
      class="bg-white hover:bg-amber-900 text-amber-900 font-semibold hover:text-white py-2 px-4 border border-amber-900 hover:border-transparent rounded"
    >
      RESET
    </button>

    <br />
    <br />
    <!-- Space to show player turn -->
    <p id="DisplayMessage" />
  </div>
</div>
