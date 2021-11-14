<script>
  import components from './components.json'
</script>

<svelte:head>SvelteSystem</svelte:head>

<main>
  {#each components as component}
    {component.name}
    {#each component.props as prop}
      <li>{prop.name}</li>
    {/each}
  {/each}
</main>
