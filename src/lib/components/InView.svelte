<script lang="ts">
  import { onMount } from 'svelte'
  export let root = undefined
  export let isStillLoadMore = true
  export let text = ''
  export let postAction
  let isInView = false
  let observer
  let element: any
  const onChangeVisibility = (
    /** @type {{ isIntersecting: boolean; }[]} */ e
  ) => {
    isInView = e[0].isIntersecting
    if (isInView) {
      if (postAction) postAction()
    }
  }
  onMount(() => {
    let options = {
      root: root
    }
    observer = new IntersectionObserver(onChangeVisibility, options)
    if (element) {
      observer.observe(element)
    }
  })
</script>

<div
  class="load-more"
  class:element-hidden={!isStillLoadMore}
  bind:this={element}
>
  <slot {isInView} />
  {text || '...'}
</div>

<style>
  .load-more {
    width: 100%;
    text-align: center;
  }

  .element-hidden {
    display: none;
  }
</style>
