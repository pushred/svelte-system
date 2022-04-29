<script>
  import { getClass } from "@svelte-system/helpers";

  export let as = "div";
  export let testId = undefined;
  export let border = undefined;
  export let borderTop = undefined;
  export let borderRight = undefined;
  export let borderBottom = undefined;
  export let borderLeft = undefined;
  export let borderColor = undefined;
  export let borderTopColor = undefined;
  export let borderRightColor = undefined;
  export let borderBottomColor = undefined;
  export let borderLeftColor = undefined;
  export let borderStyle = undefined;
  export let borderStyleTop = undefined;
  export let borderStyleRight = undefined;
  export let borderStyleBottom = undefined;
  export let borderStyleLeft = undefined;
  export let borderWidth = undefined;
  export let borderWidthTop = undefined;
  export let borderWidthRight = undefined;
  export let borderWidthBottom = undefined;
  export let borderWidthLeft = undefined;
  export let backgroundColor = undefined;
  export let bgColor = undefined;
  export let color = undefined;
  export let alignItems = undefined;
  export let align = undefined;
  export let alignSelf = undefined;
  export let alignContent = undefined;
  export let flexBasis = undefined;
  export let basis = undefined;
  export let flexDirection = undefined;
  export let direction = undefined;
  export let flexGrow = undefined;
  export let grow = undefined;
  export let flexShrink = undefined;
  export let shrink = undefined;
  export let justifyContent = undefined;
  export let justify = undefined;
  export let justifyItems = undefined;
  export let justifySelf = undefined;
  export let order = undefined;
  export let display = undefined;
  export let d = undefined;
  export let overflow = undefined;
  export let overflowX = undefined;
  export let overflowY = undefined;
  export let verticalAlign = undefined;
  export let borderRadius = undefined;
  export let borderTopRightRadius = undefined;
  export let borderBottomRightRadius = undefined;
  export let borderBottomLeftRadius = undefined;
  export let borderTopLeftRadius = undefined;
  export let width = undefined;
  export let w = undefined;
  export let height = undefined;
  export let h = undefined;
  export let minWidth = undefined;
  export let minW = undefined;
  export let maxWidth = undefined;
  export let maxW = undefined;
  export let minHeight = undefined;
  export let minH = undefined;
  export let maxHeight = undefined;
  export let maxH = undefined;
  export let margin = undefined;
  export let m = undefined;
  export let marginTop = undefined;
  export let mt = undefined;
  export let marginRight = undefined;
  export let mr = undefined;
  export let marginBottom = undefined;
  export let mb = undefined;
  export let marginLeft = undefined;
  export let ml = undefined;
  export let padding = undefined;
  export let p = undefined;
  export let paddingTop = undefined;
  export let pt = undefined;
  export let paddingRight = undefined;
  export let pr = undefined;
  export let paddingBottom = undefined;
  export let pb = undefined;
  export let paddingLeft = undefined;
  export let pl = undefined;
  export let fontFamily = undefined;
  export let fontSize = undefined;
  export let fontWeight = undefined;
  export let letterSpacing = undefined;
  export let lineHeight = undefined;
  export let textAlign = undefined;
  export let textTransform = undefined;

  let className;
  $: className = getClass({
    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderColor,
    borderTopColor,
    borderRightColor,
    borderBottomColor,
    borderLeftColor,
    borderStyle,
    borderStyleTop,
    borderStyleRight,
    borderStyleBottom,
    borderStyleLeft,
    borderWidth,
    borderWidthTop,
    borderWidthRight,
    borderWidthBottom,
    borderWidthLeft,
    backgroundColor,
    bgColor,
    color,
    alignItems,
    align,
    alignSelf,
    alignContent,
    flexBasis,
    basis,
    flexDirection,
    direction,
    flexGrow,
    grow,
    flexShrink,
    shrink,
    justifyContent,
    justify,
    justifyItems,
    justifySelf,
    order,
    display,
    d,
    overflow,
    overflowX,
    overflowY,
    verticalAlign,
    borderRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
    borderTopLeftRadius,
    width,
    w,
    height,
    h,
    minWidth,
    minW,
    maxWidth,
    maxW,
    minHeight,
    minH,
    maxHeight,
    maxH,
    margin,
    m,
    marginTop,
    mt,
    marginRight,
    mr,
    marginBottom,
    mb,
    marginLeft,
    ml,
    padding,
    p,
    paddingTop,
    pt,
    paddingRight,
    pr,
    paddingBottom,
    pb,
    paddingLeft,
    pl,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    textAlign,
    textTransform,
  });
</script>

{#if as === "a"}
  <a
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </a>
{:else if as === "abbr"}
  <abbr
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </abbr>
{:else if as === "audio"}
  <audio
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </audio>
{:else if as === "blockquote"}
  <blockquote
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </blockquote>
{:else if as === "button"}
  <button
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </button>
{:else if as === "code"}
  <code
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </code>
{:else if as === "del"}
  <del
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </del>
{:else if as === "div"}
  <div
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </div>
{:else if as === "dfn"}
  <dfn
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </dfn>
{:else if as === "em"}
  <em
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </em>
{:else if as === "figcaption"}
  <figcaption
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </figcaption>
{:else if as === "footer"}
  <footer
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </footer>
{:else if as === "form"}
  <form
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </form>
{:else if as === "h1"}
  <h1
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </h1>
{:else if as === "h2"}
  <h2
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </h2>
{:else if as === "h3"}
  <h3
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </h3>
{:else if as === "h4"}
  <h4
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </h4>
{:else if as === "h5"}
  <h5
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </h5>
{:else if as === "h6"}
  <h6
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </h6>
{:else if as === "header"}
  <header
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </header>
{:else if as === "img"}
  <img
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  />
{:else if as === "ins"}
  <ins
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </ins>
{:else if as === "kbd"}
  <kbd
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </kbd>
{:else if as === "label"}
  <label
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </label>
{:else if as === "li"}
  <li
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </li>
{:else if as === "main"}
  <main
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </main>
{:else if as === "mark"}
  <mark
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </mark>
{:else if as === "nav"}
  <nav
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </nav>
{:else if as === "ol"}
  <ol
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </ol>
{:else if as === "p"}
  <p
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </p>
{:else if as === "pre"}
  <pre
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}>
      <slot />
    </pre>
{:else if as === "q"}
  <q
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </q>
{:else if as === "section"}
  <section
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </section>
{:else if as === "select"}
  <select
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </select>
{:else if as === "small"}
  <small
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </small>
{:else if as === "span"}
  <span
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </span>
{:else if as === "strong"}
  <strong
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </strong>
{:else if as === "table"}
  <table
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </table>
{:else if as === "td"}
  <td
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </td>
{:else if as === "th"}
  <th
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </th>
{:else if as === "time"}
  <time
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </time>
{:else if as === "tr"}
  <tr
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </tr>
{:else if as === "ul"}
  <ul
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </ul>
{:else if as === "var"}
  <var
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </var>
{:else if as === "video"}
  <video
    class={className}
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    data-testid={testId}
    {...$$restProps}
  >
    <slot />
  </video>{/if}
