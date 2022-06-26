<script>
  export let as = "div";
  export let testId = undefined;
  export let color = undefined;
</script>

<svelte:element
  this={as}
  {...$$restProps}
  class:color-primary={color === "primary"}
  data-testid={testId}
>
  <slot />
</svelte:element>
