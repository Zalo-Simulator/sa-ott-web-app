<script lang="ts">
  export let tabIndex = 0
  export let tabs: any[] = []
</script>

<ul class="nav nav-tabs nav-pills">
  {#each tabs as tab, index}
    <li class="nav-item">
      <a
        class="nav-link"
        class:active={tabIndex == index}
        on:click={()=>{
            tabIndex = index
        }}
        href="#">{tab}</a
      >
    </li>
  {/each}
</ul>
