<script lang="ts">
  import { onMount } from 'svelte'
  export let handler: (reaction: any, message: any) => void
  export let message: any

  let showPopup = false
  let popupX = 0
  let popupY = 0

  const reactions = ['❤️', '👍', '😆', '😢', '😡']

  const openPopup = (event: any) => {
    showPopup = true
    popupX = event.clientX
    popupY = event.clientY
  }

  const selectReaction = (reaction: any) => {
    if (handler) {
      handler(reaction, message)
    }
    showPopup = false
    // Optional: trigger any action here
  }

  // Close popup if click outside
  onMount(() => {
    const handleClickOutside = (event: any) => {
      if (
        !event.target.closest('.popup') &&
        !event.target.closest('.trigger-button')
      ) {
        showPopup = false
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  })
</script>

<div class="reaction-picker">
  <button class="trigger-button" on:click={openPopup}>
    <svg
      class="heart-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      stroke="black"
      stroke-width="1"
      width="24"
      height="24"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 
                 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 
                 2.09C13.09 3.81 14.76 3 16.5 
                 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                 6.86-8.55 11.54L12 21.35z"
      ></path>
    </svg>
  </button>

  {#if showPopup}
    <div class="popup" style="top: {popupY}px; left: {popupX}px;">
      {#each reactions as reaction}
        <button on:click={() => selectReaction(reaction)}>{reaction}</button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .reaction-picker {
    position: absolute;
    display: inline-block;
    margin-top: -5px;
  }

  .trigger-button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .heart-icon {
    width: 24px;
    height: 24px;
    display: block;
  }

  .selected-reaction {
    margin-left: 8px;
    font-size: 20px;
  }

  .popup {
    position: fixed;
    display: flex;
    background: white;
    border-radius: 24px;
    padding: 8px 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    gap: 8px;
    transform: translate(-50%, -100%);
    animation: popupFade 0.2s ease-out;
    z-index: 1000;
  }

  .popup button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .popup button:hover {
    transform: scale(1.3);
  }

  @keyframes popupFade {
    from {
      opacity: 0;
      transform: translate(-50%, -80%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -100%);
    }
  }
</style>
