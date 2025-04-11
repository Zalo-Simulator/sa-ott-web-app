<script lang="ts">
  import { goto } from '$app/navigation'
  import { isUserLoggedIn } from '$lib/service/login'
  import { onMount } from 'svelte'

  onMount(async () => {
    if (!(await isUserLoggedIn())) {
      goto('/login')
    } else {
      goto('/chat')
    }
  })
</script>
