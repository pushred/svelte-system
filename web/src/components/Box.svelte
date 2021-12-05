<script>
  export let testId = undefined;
  export let alignItems = undefined;
  export let align = undefined;
  export let alignSelf = undefined;
  export let alignContent = undefined;
  export let flexBasis = undefined;
  export let basis = undefined;
  export let flexDirection = undefined;
  export let direction = undefined;
  export let justifyContent = undefined;
  export let justify = undefined;
  export let justifyItems = undefined;
  export let justifySelf = undefined;
  export let display = undefined;
  export let d = undefined;
  export let overflow = undefined;
  export let overflowX = undefined;
  export let overflowY = undefined;
  export let verticalAlign = undefined;
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
  export let textAlign = undefined;
  export let textTransform = undefined;
</script>

<div
  class:align-baseline={alignItems === "baseline" || align === "baseline"}
  class:align-center={alignItems === "center" || align === "center"}
  class:align-end={alignItems === "end" || align === "end"}
  class:align-flex-end={alignItems === "flex-end" || align === "flex-end"}
  class:align-flex-start={alignItems === "flex-start" || align === "flex-start"}
  class:align-start={alignItems === "start" || align === "start"}
  class:align-normal={alignItems === "normal" || align === "normal"}
  class:align-self-baseline={alignSelf === "baseline"}
  class:align-self-center={alignSelf === "center"}
  class:align-self-end={alignSelf === "end"}
  class:align-self-flex-end={alignSelf === "flex-end"}
  class:align-self-flex-start={alignSelf === "flex-start"}
  class:align-self-start={alignSelf === "start"}
  class:align-self-auto={alignSelf === "auto"}
  class:align-self-left={alignSelf === "left"}
  class:align-self-normal={alignSelf === "normal"}
  class:align-self-right={alignSelf === "right"}
  class:align-self-self-start={alignSelf === "self-start"}
  class:align-self-self-end={alignSelf === "self-end"}
  class:align-self-stretch={alignSelf === "stretch"}
  class:align-content-baseline={alignContent === "baseline"}
  class:align-content-space-around={alignContent === "space-around"}
  class:align-content-space-between={alignContent === "space-between"}
  class:align-content-space-evenly={alignContent === "space-evenly"}
  class:align-content-stretch={alignContent === "stretch"}
  class:align-content-center={alignContent === "center"}
  class:align-content-end={alignContent === "end"}
  class:align-content-flex-end={alignContent === "flex-end"}
  class:align-content-flex-start={alignContent === "flex-start"}
  class:align-content-start={alignContent === "start"}
  class:align-content-normal={alignContent === "normal"}
  class:basis-fill={flexBasis === "fill" || basis === "fill"}
  class:basis-fit-content={flexBasis === "fit-content" ||
    basis === "fit-content"}
  class:basis-max-content={flexBasis === "max-content" ||
    basis === "max-content"}
  class:basis-min-content={flexBasis === "min-content" ||
    basis === "min-content"}
  class:basis-auto={flexBasis === "auto" || basis === "auto"}
  class:basis-content={flexBasis === "content" || basis === "content"}
  class:direction-column={flexDirection === "column" || direction === "column"}
  class:direction-column-reverse={flexDirection === "column-reverse" ||
    direction === "column-reverse"}
  class:direction-row={flexDirection === "row" || direction === "row"}
  class:direction-row-reverse={flexDirection === "row-reverse" ||
    direction === "row-reverse"}
  class:justify-space-around={justifyContent === "space-around" ||
    justify === "space-around"}
  class:justify-space-between={justifyContent === "space-between" ||
    justify === "space-between"}
  class:justify-space-evenly={justifyContent === "space-evenly" ||
    justify === "space-evenly"}
  class:justify-stretch={justifyContent === "stretch" || justify === "stretch"}
  class:justify-center={justifyContent === "center" || justify === "center"}
  class:justify-end={justifyContent === "end" || justify === "end"}
  class:justify-flex-end={justifyContent === "flex-end" ||
    justify === "flex-end"}
  class:justify-flex-start={justifyContent === "flex-start" ||
    justify === "flex-start"}
  class:justify-start={justifyContent === "start" || justify === "start"}
  class:justify-left={justifyContent === "left" || justify === "left"}
  class:justify-normal={justifyContent === "normal" || justify === "normal"}
  class:justify-right={justifyContent === "right" || justify === "right"}
  class:justify-items-baseline={justifyItems === "baseline"}
  class:justify-items-center={justifyItems === "center"}
  class:justify-items-end={justifyItems === "end"}
  class:justify-items-flex-end={justifyItems === "flex-end"}
  class:justify-items-flex-start={justifyItems === "flex-start"}
  class:justify-items-start={justifyItems === "start"}
  class:justify-items-auto={justifyItems === "auto"}
  class:justify-items-left={justifyItems === "left"}
  class:justify-items-normal={justifyItems === "normal"}
  class:justify-items-right={justifyItems === "right"}
  class:justify-items-self-start={justifyItems === "self-start"}
  class:justify-items-self-end={justifyItems === "self-end"}
  class:justify-self-baseline={justifySelf === "baseline"}
  class:justify-self-center={justifySelf === "center"}
  class:justify-self-end={justifySelf === "end"}
  class:justify-self-flex-end={justifySelf === "flex-end"}
  class:justify-self-flex-start={justifySelf === "flex-start"}
  class:justify-self-start={justifySelf === "start"}
  class:justify-self-auto={justifySelf === "auto"}
  class:justify-self-left={justifySelf === "left"}
  class:justify-self-normal={justifySelf === "normal"}
  class:justify-self-right={justifySelf === "right"}
  class:justify-self-self-start={justifySelf === "self-start"}
  class:justify-self-self-end={justifySelf === "self-end"}
  class:justify-self-stretch={justifySelf === "stretch"}
  class:d-block={display === "block" || d === "block"}
  class:d-contents={display === "contents" || d === "contents"}
  class:d-flex={display === "flex" || d === "flex"}
  class:d-grid={display === "grid" || d === "grid"}
  class:d-inline-block={display === "inline-block" || d === "inline-block"}
  class:d-inline-flex={display === "inline-flex" || d === "inline-flex"}
  class:d-inline-grid={display === "inline-grid" || d === "inline-grid"}
  class:d-inline={display === "inline" || d === "inline"}
  class:d-none={display === "none" || d === "none"}
  class:overflow-auto={overflow === "auto"}
  class:overflow-clip={overflow === "clip"}
  class:overflow-hidden={overflow === "hidden"}
  class:overflow-scroll={overflow === "scroll"}
  class:overflow-visible={overflow === "visible"}
  class:overflow-x-auto={overflowX === "auto"}
  class:overflow-x-clip={overflowX === "clip"}
  class:overflow-x-hidden={overflowX === "hidden"}
  class:overflow-x-scroll={overflowX === "scroll"}
  class:overflow-x-visible={overflowX === "visible"}
  class:overflow-y-auto={overflowY === "auto"}
  class:overflow-y-clip={overflowY === "clip"}
  class:overflow-y-hidden={overflowY === "hidden"}
  class:overflow-y-scroll={overflowY === "scroll"}
  class:overflow-y-visible={overflowY === "visible"}
  class:vertical-align-baseline={verticalAlign === "baseline"}
  class:vertical-align-sub={verticalAlign === "sub"}
  class:vertical-align-super={verticalAlign === "super"}
  class:vertical-align-text-top={verticalAlign === "text-top"}
  class:vertical-align-text-bottom={verticalAlign === "text-bottom"}
  class:vertical-align-middle={verticalAlign === "middle"}
  class:m-1={margin === "1" || m === "1"}
  class:m-2={margin === "2" || m === "2"}
  class:mt-1={marginTop === "1" || mt === "1"}
  class:mt-2={marginTop === "2" || mt === "2"}
  class:mr-1={marginRight === "1" || mr === "1"}
  class:mr-2={marginRight === "2" || mr === "2"}
  class:mb-1={marginBottom === "1" || mb === "1"}
  class:mb-2={marginBottom === "2" || mb === "2"}
  class:ml-1={marginLeft === "1" || ml === "1"}
  class:ml-2={marginLeft === "2" || ml === "2"}
  class:p-1={padding === "1" || p === "1"}
  class:p-2={padding === "2" || p === "2"}
  class:pt-1={paddingTop === "1" || pt === "1"}
  class:pt-2={paddingTop === "2" || pt === "2"}
  class:pr-1={paddingRight === "1" || pr === "1"}
  class:pr-2={paddingRight === "2" || pr === "2"}
  class:pb-1={paddingBottom === "1" || pb === "1"}
  class:pb-2={paddingBottom === "2" || pb === "2"}
  class:pl-1={paddingLeft === "1" || pl === "1"}
  class:pl-2={paddingLeft === "2" || pl === "2"}
  class:text-align-center={textAlign === "center"}
  class:text-align-left={textAlign === "left"}
  class:text-align-right={textAlign === "right"}
  class:text-transform-capitalize={textTransform === "capitalize"}
  class:text-transform-uppercase={textTransform === "uppercase"}
  class:text-transform-lowercase={textTransform === "lowercase"}
  class:text-transform-none={textTransform === "none"}
  data-testid={testId}
>
  <slot />
</div>

<style>
  .align-baseline {
    align-items: baseline;
  }
  .align-center {
    align-items: center;
  }
  .align-end {
    align-items: end;
  }
  .align-flex-end {
    align-items: flex-end;
  }
  .align-flex-start {
    align-items: flex-start;
  }
  .align-start {
    align-items: start;
  }
  .align-normal {
    align-items: normal;
  }
  .align-self-baseline {
    align-self: baseline;
  }
  .align-self-center {
    align-self: center;
  }
  .align-self-end {
    align-self: end;
  }
  .align-self-flex-end {
    align-self: flex-end;
  }
  .align-self-flex-start {
    align-self: flex-start;
  }
  .align-self-start {
    align-self: start;
  }
  .align-self-auto {
    align-self: auto;
  }
  .align-self-left {
    align-self: left;
  }
  .align-self-normal {
    align-self: normal;
  }
  .align-self-right {
    align-self: right;
  }
  .align-self-self-start {
    align-self: self-start;
  }
  .align-self-self-end {
    align-self: self-end;
  }
  .align-self-stretch {
    align-self: stretch;
  }
  .align-content-baseline {
    align-content: baseline;
  }
  .align-content-space-around {
    align-content: space-around;
  }
  .align-content-space-between {
    align-content: space-between;
  }
  .align-content-space-evenly {
    align-content: space-evenly;
  }
  .align-content-stretch {
    align-content: stretch;
  }
  .align-content-center {
    align-content: center;
  }
  .align-content-end {
    align-content: end;
  }
  .align-content-flex-end {
    align-content: flex-end;
  }
  .align-content-flex-start {
    align-content: flex-start;
  }
  .align-content-start {
    align-content: start;
  }
  .align-content-normal {
    align-content: normal;
  }
  .basis-fill {
    flex-basis: fill;
  }
  .basis-fit-content {
    flex-basis: fit-content;
  }
  .basis-max-content {
    flex-basis: max-content;
  }
  .basis-min-content {
    flex-basis: min-content;
  }
  .basis-auto {
    flex-basis: auto;
  }
  .basis-content {
    flex-basis: content;
  }
  .direction-column {
    flex-direction: column;
  }
  .direction-column-reverse {
    flex-direction: column-reverse;
  }
  .direction-row {
    flex-direction: row;
  }
  .direction-row-reverse {
    flex-direction: row-reverse;
  }
  .justify-space-around {
    justify-content: space-around;
  }
  .justify-space-between {
    justify-content: space-between;
  }
  .justify-space-evenly {
    justify-content: space-evenly;
  }
  .justify-stretch {
    justify-content: stretch;
  }
  .justify-center {
    justify-content: center;
  }
  .justify-end {
    justify-content: end;
  }
  .justify-flex-end {
    justify-content: flex-end;
  }
  .justify-flex-start {
    justify-content: flex-start;
  }
  .justify-start {
    justify-content: start;
  }
  .justify-left {
    justify-content: left;
  }
  .justify-normal {
    justify-content: normal;
  }
  .justify-right {
    justify-content: right;
  }
  .justify-items-baseline {
    justify-items: baseline;
  }
  .justify-items-center {
    justify-items: center;
  }
  .justify-items-end {
    justify-items: end;
  }
  .justify-items-flex-end {
    justify-items: flex-end;
  }
  .justify-items-flex-start {
    justify-items: flex-start;
  }
  .justify-items-start {
    justify-items: start;
  }
  .justify-items-auto {
    justify-items: auto;
  }
  .justify-items-left {
    justify-items: left;
  }
  .justify-items-normal {
    justify-items: normal;
  }
  .justify-items-right {
    justify-items: right;
  }
  .justify-items-self-start {
    justify-items: self-start;
  }
  .justify-items-self-end {
    justify-items: self-end;
  }
  .justify-self-baseline {
    justify-self: baseline;
  }
  .justify-self-center {
    justify-self: center;
  }
  .justify-self-end {
    justify-self: end;
  }
  .justify-self-flex-end {
    justify-self: flex-end;
  }
  .justify-self-flex-start {
    justify-self: flex-start;
  }
  .justify-self-start {
    justify-self: start;
  }
  .justify-self-auto {
    justify-self: auto;
  }
  .justify-self-left {
    justify-self: left;
  }
  .justify-self-normal {
    justify-self: normal;
  }
  .justify-self-right {
    justify-self: right;
  }
  .justify-self-self-start {
    justify-self: self-start;
  }
  .justify-self-self-end {
    justify-self: self-end;
  }
  .justify-self-stretch {
    justify-self: stretch;
  }
  .d-block {
    display: block;
  }
  .d-contents {
    display: contents;
  }
  .d-flex {
    display: flex;
  }
  .d-grid {
    display: grid;
  }
  .d-inline-block {
    display: inline-block;
  }
  .d-inline-flex {
    display: inline-flex;
  }
  .d-inline-grid {
    display: inline-grid;
  }
  .d-inline {
    display: inline;
  }
  .d-none {
    display: none;
  }
  .overflow-auto {
    overflow: auto;
  }
  .overflow-clip {
    overflow: clip;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-scroll {
    overflow: scroll;
  }
  .overflow-visible {
    overflow: visible;
  }
  .overflow-x-auto {
    overflow-x: auto;
  }
  .overflow-x-clip {
    overflow-x: clip;
  }
  .overflow-x-hidden {
    overflow-x: hidden;
  }
  .overflow-x-scroll {
    overflow-x: scroll;
  }
  .overflow-x-visible {
    overflow-x: visible;
  }
  .overflow-y-auto {
    overflow-y: auto;
  }
  .overflow-y-clip {
    overflow-y: clip;
  }
  .overflow-y-hidden {
    overflow-y: hidden;
  }
  .overflow-y-scroll {
    overflow-y: scroll;
  }
  .overflow-y-visible {
    overflow-y: visible;
  }
  .vertical-align-baseline {
    vertical-align: baseline;
  }
  .vertical-align-sub {
    vertical-align: sub;
  }
  .vertical-align-super {
    vertical-align: super;
  }
  .vertical-align-text-top {
    vertical-align: text-top;
  }
  .vertical-align-text-bottom {
    vertical-align: text-bottom;
  }
  .vertical-align-middle {
    vertical-align: middle;
  }
  .m-1 {
    margin: 0.25rem;
  }
  .m-2 {
    margin: 0.5rem;
  }
  .mt-1 {
    margin-top: 0.25rem;
  }
  .mt-2 {
    margin-top: 0.5rem;
  }
  .mr-1 {
    margin-right: 0.25rem;
  }
  .mr-2 {
    margin-right: 0.5rem;
  }
  .mb-1 {
    margin-bottom: 0.25rem;
  }
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  .ml-1 {
    margin-left: 0.25rem;
  }
  .ml-2 {
    margin-left: 0.5rem;
  }
  .p-1 {
    padding: 0.25rem;
  }
  .p-2 {
    padding: 0.5rem;
  }
  .pt-1 {
    padding-top: 0.25rem;
  }
  .pt-2 {
    padding-top: 0.5rem;
  }
  .pr-1 {
    padding-right: 0.25rem;
  }
  .pr-2 {
    padding-right: 0.5rem;
  }
  .pb-1 {
    padding-bottom: 0.25rem;
  }
  .pb-2 {
    padding-bottom: 0.5rem;
  }
  .pl-1 {
    padding-left: 0.25rem;
  }
  .pl-2 {
    padding-left: 0.5rem;
  }
  .text-align-center {
    text-align: center;
  }
  .text-align-left {
    text-align: left;
  }
  .text-align-right {
    text-align: right;
  }
  .text-transform-capitalize {
    text-transform: capitalize;
  }
  .text-transform-uppercase {
    text-transform: uppercase;
  }
  .text-transform-lowercase {
    text-transform: lowercase;
  }
  .text-transform-none {
    text-transform: none;
  }
</style>
