<script lang="ts">
  export let tabIndex = 0
  export let tabs: any[] = []
</script>

<ul class="nav nav-tabs nav-pills">
  {#each tabs as tab, index}
    <li class="nav-item">
      {#if tab.notify}
        <div
          class="badge float-right"
          class:badge-light={tabIndex == index}
          class:badge-primary={tabIndex != index}
        >
          {tab.notify}
        </div>
      {/if}
      <a
        class="nav-link"
        class:active={tabIndex == index}
        on:click={() => {
          tabIndex = index
        }}
        href="#">{tab.name}</a
      >
    </li>
  {/each}
</ul>
