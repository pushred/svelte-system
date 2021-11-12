<script>
  export let testId = undefined;
  export let marginBottom = undefined;
</script>

<div
  class:margin-bottom-1={marginBottom === "1"}
  class:margin-bottom-2={marginBottom === "2"}
  data-testid={testId}
>
  <slot />
</div>

<style>
  .margin-bottom-1 {
    margin-bottom: 0.25rem;
  }
  .margin-bottom-2 {
    margin-bottom: 0.5rem;
  }
</style>
