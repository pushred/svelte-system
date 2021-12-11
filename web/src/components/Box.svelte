<script>
  export let testId = undefined;
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
  export let lineHeight = undefined;
  export let textAlign = undefined;
  export let textTransform = undefined;
</script>

<div
  class:bg-color-background={backgroundColor === "background" ||
    bgColor === "background"}
  class:bg-color-text={backgroundColor === "text" || bgColor === "text"}
  class:bg-color-primary={backgroundColor === "primary" ||
    bgColor === "primary"}
  class:bg-color-secondary={backgroundColor === "secondary" ||
    bgColor === "secondary"}
  class:bg-color-accent={backgroundColor === "accent" || bgColor === "accent"}
  class:bg-color-highlight={backgroundColor === "highlight" ||
    bgColor === "highlight"}
  class:bg-color-muted={backgroundColor === "muted" || bgColor === "muted"}
  class:color-background={color === "background"}
  class:color-text={color === "text"}
  class:color-primary={color === "primary"}
  class:color-secondary={color === "secondary"}
  class:color-accent={color === "accent"}
  class:color-highlight={color === "highlight"}
  class:color-muted={color === "muted"}
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
  class:basis-0={flexBasis === "0" || basis === "0"}
  class:basis-1={flexBasis === "1" || basis === "1"}
  class:basis-2={flexBasis === "2" || basis === "2"}
  class:basis-3={flexBasis === "3" || basis === "3"}
  class:basis-4={flexBasis === "4" || basis === "4"}
  class:basis-5={flexBasis === "5" || basis === "5"}
  class:basis-6={flexBasis === "6" || basis === "6"}
  class:basis-7={flexBasis === "7" || basis === "7"}
  class:basis-8={flexBasis === "8" || basis === "8"}
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
  class:grow-0={flexGrow === "0" || grow === "0"}
  class:grow-1={flexGrow === "1" || grow === "1"}
  class:shrink-0={flexShrink === "0" || shrink === "0"}
  class:shrink-1={flexShrink === "1" || shrink === "1"}
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
  class:order-0={order === "0"}
  class:order-1={order === "1"}
  class:order-2={order === "2"}
  class:order-3={order === "3"}
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
  class:w-0={width === "0" || w === "0"}
  class:w-1={width === "1" || w === "1"}
  class:w-2={width === "2" || w === "2"}
  class:w-3={width === "3" || w === "3"}
  class:w-4={width === "4" || w === "4"}
  class:w-5={width === "5" || w === "5"}
  class:w-6={width === "6" || w === "6"}
  class:w-7={width === "7" || w === "7"}
  class:w-8={width === "8" || w === "8"}
  class:h-0={height === "0" || h === "0"}
  class:h-1={height === "1" || h === "1"}
  class:h-2={height === "2" || h === "2"}
  class:h-3={height === "3" || h === "3"}
  class:h-4={height === "4" || h === "4"}
  class:h-5={height === "5" || h === "5"}
  class:h-6={height === "6" || h === "6"}
  class:h-7={height === "7" || h === "7"}
  class:h-8={height === "8" || h === "8"}
  class:min-w-0={minWidth === "0" || minW === "0"}
  class:min-w-1={minWidth === "1" || minW === "1"}
  class:min-w-2={minWidth === "2" || minW === "2"}
  class:min-w-3={minWidth === "3" || minW === "3"}
  class:min-w-4={minWidth === "4" || minW === "4"}
  class:min-w-5={minWidth === "5" || minW === "5"}
  class:min-w-6={minWidth === "6" || minW === "6"}
  class:min-w-7={minWidth === "7" || minW === "7"}
  class:min-w-8={minWidth === "8" || minW === "8"}
  class:max-w-0={maxWidth === "0" || maxW === "0"}
  class:max-w-1={maxWidth === "1" || maxW === "1"}
  class:max-w-2={maxWidth === "2" || maxW === "2"}
  class:max-w-3={maxWidth === "3" || maxW === "3"}
  class:max-w-4={maxWidth === "4" || maxW === "4"}
  class:max-w-5={maxWidth === "5" || maxW === "5"}
  class:max-w-6={maxWidth === "6" || maxW === "6"}
  class:max-w-7={maxWidth === "7" || maxW === "7"}
  class:max-w-8={maxWidth === "8" || maxW === "8"}
  class:min-h-0={minHeight === "0" || minH === "0"}
  class:min-h-1={minHeight === "1" || minH === "1"}
  class:min-h-2={minHeight === "2" || minH === "2"}
  class:min-h-3={minHeight === "3" || minH === "3"}
  class:min-h-4={minHeight === "4" || minH === "4"}
  class:min-h-5={minHeight === "5" || minH === "5"}
  class:min-h-6={minHeight === "6" || minH === "6"}
  class:min-h-7={minHeight === "7" || minH === "7"}
  class:min-h-8={minHeight === "8" || minH === "8"}
  class:max-h-0={maxHeight === "0" || maxH === "0"}
  class:max-h-1={maxHeight === "1" || maxH === "1"}
  class:max-h-2={maxHeight === "2" || maxH === "2"}
  class:max-h-3={maxHeight === "3" || maxH === "3"}
  class:max-h-4={maxHeight === "4" || maxH === "4"}
  class:max-h-5={maxHeight === "5" || maxH === "5"}
  class:max-h-6={maxHeight === "6" || maxH === "6"}
  class:max-h-7={maxHeight === "7" || maxH === "7"}
  class:max-h-8={maxHeight === "8" || maxH === "8"}
  class:m-0={margin === "0" || m === "0"}
  class:m-1={margin === "1" || m === "1"}
  class:m-2={margin === "2" || m === "2"}
  class:m-3={margin === "3" || m === "3"}
  class:m-4={margin === "4" || m === "4"}
  class:m-5={margin === "5" || m === "5"}
  class:m-6={margin === "6" || m === "6"}
  class:m-7={margin === "7" || m === "7"}
  class:m-8={margin === "8" || m === "8"}
  class:m-9={margin === "9" || m === "9"}
  class:m-10={margin === "10" || m === "10"}
  class:m-11={margin === "11" || m === "11"}
  class:m-12={margin === "12" || m === "12"}
  class:m-14={margin === "14" || m === "14"}
  class:m-16={margin === "16" || m === "16"}
  class:m-20={margin === "20" || m === "20"}
  class:m-24={margin === "24" || m === "24"}
  class:m-28={margin === "28" || m === "28"}
  class:m-32={margin === "32" || m === "32"}
  class:m-36={margin === "36" || m === "36"}
  class:m-40={margin === "40" || m === "40"}
  class:m-44={margin === "44" || m === "44"}
  class:m-48={margin === "48" || m === "48"}
  class:m-52={margin === "52" || m === "52"}
  class:m-56={margin === "56" || m === "56"}
  class:m-60={margin === "60" || m === "60"}
  class:m-64={margin === "64" || m === "64"}
  class:m-72={margin === "72" || m === "72"}
  class:m-80={margin === "80" || m === "80"}
  class:m-96={margin === "96" || m === "96"}
  class:m-px={margin === "px" || m === "px"}
  class:m-0-5={margin === "0.5" || m === "0.5"}
  class:m-1-5={margin === "1.5" || m === "1.5"}
  class:m-2-5={margin === "2.5" || m === "2.5"}
  class:m-3-5={margin === "3.5" || m === "3.5"}
  class:mt-0={marginTop === "0" || mt === "0"}
  class:mt-1={marginTop === "1" || mt === "1"}
  class:mt-2={marginTop === "2" || mt === "2"}
  class:mt-3={marginTop === "3" || mt === "3"}
  class:mt-4={marginTop === "4" || mt === "4"}
  class:mt-5={marginTop === "5" || mt === "5"}
  class:mt-6={marginTop === "6" || mt === "6"}
  class:mt-7={marginTop === "7" || mt === "7"}
  class:mt-8={marginTop === "8" || mt === "8"}
  class:mt-9={marginTop === "9" || mt === "9"}
  class:mt-10={marginTop === "10" || mt === "10"}
  class:mt-11={marginTop === "11" || mt === "11"}
  class:mt-12={marginTop === "12" || mt === "12"}
  class:mt-14={marginTop === "14" || mt === "14"}
  class:mt-16={marginTop === "16" || mt === "16"}
  class:mt-20={marginTop === "20" || mt === "20"}
  class:mt-24={marginTop === "24" || mt === "24"}
  class:mt-28={marginTop === "28" || mt === "28"}
  class:mt-32={marginTop === "32" || mt === "32"}
  class:mt-36={marginTop === "36" || mt === "36"}
  class:mt-40={marginTop === "40" || mt === "40"}
  class:mt-44={marginTop === "44" || mt === "44"}
  class:mt-48={marginTop === "48" || mt === "48"}
  class:mt-52={marginTop === "52" || mt === "52"}
  class:mt-56={marginTop === "56" || mt === "56"}
  class:mt-60={marginTop === "60" || mt === "60"}
  class:mt-64={marginTop === "64" || mt === "64"}
  class:mt-72={marginTop === "72" || mt === "72"}
  class:mt-80={marginTop === "80" || mt === "80"}
  class:mt-96={marginTop === "96" || mt === "96"}
  class:mt-px={marginTop === "px" || mt === "px"}
  class:mt-0-5={marginTop === "0.5" || mt === "0.5"}
  class:mt-1-5={marginTop === "1.5" || mt === "1.5"}
  class:mt-2-5={marginTop === "2.5" || mt === "2.5"}
  class:mt-3-5={marginTop === "3.5" || mt === "3.5"}
  class:mr-0={marginRight === "0" || mr === "0"}
  class:mr-1={marginRight === "1" || mr === "1"}
  class:mr-2={marginRight === "2" || mr === "2"}
  class:mr-3={marginRight === "3" || mr === "3"}
  class:mr-4={marginRight === "4" || mr === "4"}
  class:mr-5={marginRight === "5" || mr === "5"}
  class:mr-6={marginRight === "6" || mr === "6"}
  class:mr-7={marginRight === "7" || mr === "7"}
  class:mr-8={marginRight === "8" || mr === "8"}
  class:mr-9={marginRight === "9" || mr === "9"}
  class:mr-10={marginRight === "10" || mr === "10"}
  class:mr-11={marginRight === "11" || mr === "11"}
  class:mr-12={marginRight === "12" || mr === "12"}
  class:mr-14={marginRight === "14" || mr === "14"}
  class:mr-16={marginRight === "16" || mr === "16"}
  class:mr-20={marginRight === "20" || mr === "20"}
  class:mr-24={marginRight === "24" || mr === "24"}
  class:mr-28={marginRight === "28" || mr === "28"}
  class:mr-32={marginRight === "32" || mr === "32"}
  class:mr-36={marginRight === "36" || mr === "36"}
  class:mr-40={marginRight === "40" || mr === "40"}
  class:mr-44={marginRight === "44" || mr === "44"}
  class:mr-48={marginRight === "48" || mr === "48"}
  class:mr-52={marginRight === "52" || mr === "52"}
  class:mr-56={marginRight === "56" || mr === "56"}
  class:mr-60={marginRight === "60" || mr === "60"}
  class:mr-64={marginRight === "64" || mr === "64"}
  class:mr-72={marginRight === "72" || mr === "72"}
  class:mr-80={marginRight === "80" || mr === "80"}
  class:mr-96={marginRight === "96" || mr === "96"}
  class:mr-px={marginRight === "px" || mr === "px"}
  class:mr-0-5={marginRight === "0.5" || mr === "0.5"}
  class:mr-1-5={marginRight === "1.5" || mr === "1.5"}
  class:mr-2-5={marginRight === "2.5" || mr === "2.5"}
  class:mr-3-5={marginRight === "3.5" || mr === "3.5"}
  class:mb-0={marginBottom === "0" || mb === "0"}
  class:mb-1={marginBottom === "1" || mb === "1"}
  class:mb-2={marginBottom === "2" || mb === "2"}
  class:mb-3={marginBottom === "3" || mb === "3"}
  class:mb-4={marginBottom === "4" || mb === "4"}
  class:mb-5={marginBottom === "5" || mb === "5"}
  class:mb-6={marginBottom === "6" || mb === "6"}
  class:mb-7={marginBottom === "7" || mb === "7"}
  class:mb-8={marginBottom === "8" || mb === "8"}
  class:mb-9={marginBottom === "9" || mb === "9"}
  class:mb-10={marginBottom === "10" || mb === "10"}
  class:mb-11={marginBottom === "11" || mb === "11"}
  class:mb-12={marginBottom === "12" || mb === "12"}
  class:mb-14={marginBottom === "14" || mb === "14"}
  class:mb-16={marginBottom === "16" || mb === "16"}
  class:mb-20={marginBottom === "20" || mb === "20"}
  class:mb-24={marginBottom === "24" || mb === "24"}
  class:mb-28={marginBottom === "28" || mb === "28"}
  class:mb-32={marginBottom === "32" || mb === "32"}
  class:mb-36={marginBottom === "36" || mb === "36"}
  class:mb-40={marginBottom === "40" || mb === "40"}
  class:mb-44={marginBottom === "44" || mb === "44"}
  class:mb-48={marginBottom === "48" || mb === "48"}
  class:mb-52={marginBottom === "52" || mb === "52"}
  class:mb-56={marginBottom === "56" || mb === "56"}
  class:mb-60={marginBottom === "60" || mb === "60"}
  class:mb-64={marginBottom === "64" || mb === "64"}
  class:mb-72={marginBottom === "72" || mb === "72"}
  class:mb-80={marginBottom === "80" || mb === "80"}
  class:mb-96={marginBottom === "96" || mb === "96"}
  class:mb-px={marginBottom === "px" || mb === "px"}
  class:mb-0-5={marginBottom === "0.5" || mb === "0.5"}
  class:mb-1-5={marginBottom === "1.5" || mb === "1.5"}
  class:mb-2-5={marginBottom === "2.5" || mb === "2.5"}
  class:mb-3-5={marginBottom === "3.5" || mb === "3.5"}
  class:ml-0={marginLeft === "0" || ml === "0"}
  class:ml-1={marginLeft === "1" || ml === "1"}
  class:ml-2={marginLeft === "2" || ml === "2"}
  class:ml-3={marginLeft === "3" || ml === "3"}
  class:ml-4={marginLeft === "4" || ml === "4"}
  class:ml-5={marginLeft === "5" || ml === "5"}
  class:ml-6={marginLeft === "6" || ml === "6"}
  class:ml-7={marginLeft === "7" || ml === "7"}
  class:ml-8={marginLeft === "8" || ml === "8"}
  class:ml-9={marginLeft === "9" || ml === "9"}
  class:ml-10={marginLeft === "10" || ml === "10"}
  class:ml-11={marginLeft === "11" || ml === "11"}
  class:ml-12={marginLeft === "12" || ml === "12"}
  class:ml-14={marginLeft === "14" || ml === "14"}
  class:ml-16={marginLeft === "16" || ml === "16"}
  class:ml-20={marginLeft === "20" || ml === "20"}
  class:ml-24={marginLeft === "24" || ml === "24"}
  class:ml-28={marginLeft === "28" || ml === "28"}
  class:ml-32={marginLeft === "32" || ml === "32"}
  class:ml-36={marginLeft === "36" || ml === "36"}
  class:ml-40={marginLeft === "40" || ml === "40"}
  class:ml-44={marginLeft === "44" || ml === "44"}
  class:ml-48={marginLeft === "48" || ml === "48"}
  class:ml-52={marginLeft === "52" || ml === "52"}
  class:ml-56={marginLeft === "56" || ml === "56"}
  class:ml-60={marginLeft === "60" || ml === "60"}
  class:ml-64={marginLeft === "64" || ml === "64"}
  class:ml-72={marginLeft === "72" || ml === "72"}
  class:ml-80={marginLeft === "80" || ml === "80"}
  class:ml-96={marginLeft === "96" || ml === "96"}
  class:ml-px={marginLeft === "px" || ml === "px"}
  class:ml-0-5={marginLeft === "0.5" || ml === "0.5"}
  class:ml-1-5={marginLeft === "1.5" || ml === "1.5"}
  class:ml-2-5={marginLeft === "2.5" || ml === "2.5"}
  class:ml-3-5={marginLeft === "3.5" || ml === "3.5"}
  class:p-0={padding === "0" || p === "0"}
  class:p-1={padding === "1" || p === "1"}
  class:p-2={padding === "2" || p === "2"}
  class:p-3={padding === "3" || p === "3"}
  class:p-4={padding === "4" || p === "4"}
  class:p-5={padding === "5" || p === "5"}
  class:p-6={padding === "6" || p === "6"}
  class:p-7={padding === "7" || p === "7"}
  class:p-8={padding === "8" || p === "8"}
  class:p-9={padding === "9" || p === "9"}
  class:p-10={padding === "10" || p === "10"}
  class:p-11={padding === "11" || p === "11"}
  class:p-12={padding === "12" || p === "12"}
  class:p-14={padding === "14" || p === "14"}
  class:p-16={padding === "16" || p === "16"}
  class:p-20={padding === "20" || p === "20"}
  class:p-24={padding === "24" || p === "24"}
  class:p-28={padding === "28" || p === "28"}
  class:p-32={padding === "32" || p === "32"}
  class:p-36={padding === "36" || p === "36"}
  class:p-40={padding === "40" || p === "40"}
  class:p-44={padding === "44" || p === "44"}
  class:p-48={padding === "48" || p === "48"}
  class:p-52={padding === "52" || p === "52"}
  class:p-56={padding === "56" || p === "56"}
  class:p-60={padding === "60" || p === "60"}
  class:p-64={padding === "64" || p === "64"}
  class:p-72={padding === "72" || p === "72"}
  class:p-80={padding === "80" || p === "80"}
  class:p-96={padding === "96" || p === "96"}
  class:p-px={padding === "px" || p === "px"}
  class:p-0-5={padding === "0.5" || p === "0.5"}
  class:p-1-5={padding === "1.5" || p === "1.5"}
  class:p-2-5={padding === "2.5" || p === "2.5"}
  class:p-3-5={padding === "3.5" || p === "3.5"}
  class:pt-0={paddingTop === "0" || pt === "0"}
  class:pt-1={paddingTop === "1" || pt === "1"}
  class:pt-2={paddingTop === "2" || pt === "2"}
  class:pt-3={paddingTop === "3" || pt === "3"}
  class:pt-4={paddingTop === "4" || pt === "4"}
  class:pt-5={paddingTop === "5" || pt === "5"}
  class:pt-6={paddingTop === "6" || pt === "6"}
  class:pt-7={paddingTop === "7" || pt === "7"}
  class:pt-8={paddingTop === "8" || pt === "8"}
  class:pt-9={paddingTop === "9" || pt === "9"}
  class:pt-10={paddingTop === "10" || pt === "10"}
  class:pt-11={paddingTop === "11" || pt === "11"}
  class:pt-12={paddingTop === "12" || pt === "12"}
  class:pt-14={paddingTop === "14" || pt === "14"}
  class:pt-16={paddingTop === "16" || pt === "16"}
  class:pt-20={paddingTop === "20" || pt === "20"}
  class:pt-24={paddingTop === "24" || pt === "24"}
  class:pt-28={paddingTop === "28" || pt === "28"}
  class:pt-32={paddingTop === "32" || pt === "32"}
  class:pt-36={paddingTop === "36" || pt === "36"}
  class:pt-40={paddingTop === "40" || pt === "40"}
  class:pt-44={paddingTop === "44" || pt === "44"}
  class:pt-48={paddingTop === "48" || pt === "48"}
  class:pt-52={paddingTop === "52" || pt === "52"}
  class:pt-56={paddingTop === "56" || pt === "56"}
  class:pt-60={paddingTop === "60" || pt === "60"}
  class:pt-64={paddingTop === "64" || pt === "64"}
  class:pt-72={paddingTop === "72" || pt === "72"}
  class:pt-80={paddingTop === "80" || pt === "80"}
  class:pt-96={paddingTop === "96" || pt === "96"}
  class:pt-px={paddingTop === "px" || pt === "px"}
  class:pt-0-5={paddingTop === "0.5" || pt === "0.5"}
  class:pt-1-5={paddingTop === "1.5" || pt === "1.5"}
  class:pt-2-5={paddingTop === "2.5" || pt === "2.5"}
  class:pt-3-5={paddingTop === "3.5" || pt === "3.5"}
  class:pr-0={paddingRight === "0" || pr === "0"}
  class:pr-1={paddingRight === "1" || pr === "1"}
  class:pr-2={paddingRight === "2" || pr === "2"}
  class:pr-3={paddingRight === "3" || pr === "3"}
  class:pr-4={paddingRight === "4" || pr === "4"}
  class:pr-5={paddingRight === "5" || pr === "5"}
  class:pr-6={paddingRight === "6" || pr === "6"}
  class:pr-7={paddingRight === "7" || pr === "7"}
  class:pr-8={paddingRight === "8" || pr === "8"}
  class:pr-9={paddingRight === "9" || pr === "9"}
  class:pr-10={paddingRight === "10" || pr === "10"}
  class:pr-11={paddingRight === "11" || pr === "11"}
  class:pr-12={paddingRight === "12" || pr === "12"}
  class:pr-14={paddingRight === "14" || pr === "14"}
  class:pr-16={paddingRight === "16" || pr === "16"}
  class:pr-20={paddingRight === "20" || pr === "20"}
  class:pr-24={paddingRight === "24" || pr === "24"}
  class:pr-28={paddingRight === "28" || pr === "28"}
  class:pr-32={paddingRight === "32" || pr === "32"}
  class:pr-36={paddingRight === "36" || pr === "36"}
  class:pr-40={paddingRight === "40" || pr === "40"}
  class:pr-44={paddingRight === "44" || pr === "44"}
  class:pr-48={paddingRight === "48" || pr === "48"}
  class:pr-52={paddingRight === "52" || pr === "52"}
  class:pr-56={paddingRight === "56" || pr === "56"}
  class:pr-60={paddingRight === "60" || pr === "60"}
  class:pr-64={paddingRight === "64" || pr === "64"}
  class:pr-72={paddingRight === "72" || pr === "72"}
  class:pr-80={paddingRight === "80" || pr === "80"}
  class:pr-96={paddingRight === "96" || pr === "96"}
  class:pr-px={paddingRight === "px" || pr === "px"}
  class:pr-0-5={paddingRight === "0.5" || pr === "0.5"}
  class:pr-1-5={paddingRight === "1.5" || pr === "1.5"}
  class:pr-2-5={paddingRight === "2.5" || pr === "2.5"}
  class:pr-3-5={paddingRight === "3.5" || pr === "3.5"}
  class:pb-0={paddingBottom === "0" || pb === "0"}
  class:pb-1={paddingBottom === "1" || pb === "1"}
  class:pb-2={paddingBottom === "2" || pb === "2"}
  class:pb-3={paddingBottom === "3" || pb === "3"}
  class:pb-4={paddingBottom === "4" || pb === "4"}
  class:pb-5={paddingBottom === "5" || pb === "5"}
  class:pb-6={paddingBottom === "6" || pb === "6"}
  class:pb-7={paddingBottom === "7" || pb === "7"}
  class:pb-8={paddingBottom === "8" || pb === "8"}
  class:pb-9={paddingBottom === "9" || pb === "9"}
  class:pb-10={paddingBottom === "10" || pb === "10"}
  class:pb-11={paddingBottom === "11" || pb === "11"}
  class:pb-12={paddingBottom === "12" || pb === "12"}
  class:pb-14={paddingBottom === "14" || pb === "14"}
  class:pb-16={paddingBottom === "16" || pb === "16"}
  class:pb-20={paddingBottom === "20" || pb === "20"}
  class:pb-24={paddingBottom === "24" || pb === "24"}
  class:pb-28={paddingBottom === "28" || pb === "28"}
  class:pb-32={paddingBottom === "32" || pb === "32"}
  class:pb-36={paddingBottom === "36" || pb === "36"}
  class:pb-40={paddingBottom === "40" || pb === "40"}
  class:pb-44={paddingBottom === "44" || pb === "44"}
  class:pb-48={paddingBottom === "48" || pb === "48"}
  class:pb-52={paddingBottom === "52" || pb === "52"}
  class:pb-56={paddingBottom === "56" || pb === "56"}
  class:pb-60={paddingBottom === "60" || pb === "60"}
  class:pb-64={paddingBottom === "64" || pb === "64"}
  class:pb-72={paddingBottom === "72" || pb === "72"}
  class:pb-80={paddingBottom === "80" || pb === "80"}
  class:pb-96={paddingBottom === "96" || pb === "96"}
  class:pb-px={paddingBottom === "px" || pb === "px"}
  class:pb-0-5={paddingBottom === "0.5" || pb === "0.5"}
  class:pb-1-5={paddingBottom === "1.5" || pb === "1.5"}
  class:pb-2-5={paddingBottom === "2.5" || pb === "2.5"}
  class:pb-3-5={paddingBottom === "3.5" || pb === "3.5"}
  class:pl-0={paddingLeft === "0" || pl === "0"}
  class:pl-1={paddingLeft === "1" || pl === "1"}
  class:pl-2={paddingLeft === "2" || pl === "2"}
  class:pl-3={paddingLeft === "3" || pl === "3"}
  class:pl-4={paddingLeft === "4" || pl === "4"}
  class:pl-5={paddingLeft === "5" || pl === "5"}
  class:pl-6={paddingLeft === "6" || pl === "6"}
  class:pl-7={paddingLeft === "7" || pl === "7"}
  class:pl-8={paddingLeft === "8" || pl === "8"}
  class:pl-9={paddingLeft === "9" || pl === "9"}
  class:pl-10={paddingLeft === "10" || pl === "10"}
  class:pl-11={paddingLeft === "11" || pl === "11"}
  class:pl-12={paddingLeft === "12" || pl === "12"}
  class:pl-14={paddingLeft === "14" || pl === "14"}
  class:pl-16={paddingLeft === "16" || pl === "16"}
  class:pl-20={paddingLeft === "20" || pl === "20"}
  class:pl-24={paddingLeft === "24" || pl === "24"}
  class:pl-28={paddingLeft === "28" || pl === "28"}
  class:pl-32={paddingLeft === "32" || pl === "32"}
  class:pl-36={paddingLeft === "36" || pl === "36"}
  class:pl-40={paddingLeft === "40" || pl === "40"}
  class:pl-44={paddingLeft === "44" || pl === "44"}
  class:pl-48={paddingLeft === "48" || pl === "48"}
  class:pl-52={paddingLeft === "52" || pl === "52"}
  class:pl-56={paddingLeft === "56" || pl === "56"}
  class:pl-60={paddingLeft === "60" || pl === "60"}
  class:pl-64={paddingLeft === "64" || pl === "64"}
  class:pl-72={paddingLeft === "72" || pl === "72"}
  class:pl-80={paddingLeft === "80" || pl === "80"}
  class:pl-96={paddingLeft === "96" || pl === "96"}
  class:pl-px={paddingLeft === "px" || pl === "px"}
  class:pl-0-5={paddingLeft === "0.5" || pl === "0.5"}
  class:pl-1-5={paddingLeft === "1.5" || pl === "1.5"}
  class:pl-2-5={paddingLeft === "2.5" || pl === "2.5"}
  class:pl-3-5={paddingLeft === "3.5" || pl === "3.5"}
  class:font-family-body={fontFamily === "body" || fontFamily === "heading"}
  class:font-family-mono={fontFamily === "mono"}
  class:font-size-0={fontSize === "0"}
  class:font-size-1={fontSize === "1"}
  class:font-size-2={fontSize === "2"}
  class:font-size-3={fontSize === "3"}
  class:font-size-4={fontSize === "4"}
  class:font-size-5={fontSize === "5"}
  class:font-size-6={fontSize === "6"}
  class:font-size-7={fontSize === "7"}
  class:font-weight-body={fontWeight === "body"}
  class:font-weight-bold={fontWeight === "bold" || fontWeight === "heading"}
  class:line-height-body={lineHeight === "body"}
  class:line-height-heading={lineHeight === "heading"}
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
  .bg-color-background {
    background-color: #fff;
  }
  .bg-color-text {
    background-color: #444;
  }
  .bg-color-primary {
    background-color: #f3e000;
  }
  .bg-color-secondary {
    background-color: #40b3ff;
  }
  .bg-color-accent {
    background-color: #ff3e00;
  }
  .bg-color-highlight {
    background-color: #ffd9d2;
  }
  .bg-color-muted {
    background-color: #676778;
  }
  .color-background {
    color: #fff;
  }
  .color-text {
    color: #444;
  }
  .color-primary {
    color: #f3e000;
  }
  .color-secondary {
    color: #40b3ff;
  }
  .color-accent {
    color: #ff3e00;
  }
  .color-highlight {
    color: #ffd9d2;
  }
  .color-muted {
    color: #676778;
  }
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
  .basis-0 {
    flex-basis: 0;
  }
  .basis-1 {
    flex-basis: 4px;
  }
  .basis-2 {
    flex-basis: 8px;
  }
  .basis-3 {
    flex-basis: 16px;
  }
  .basis-4 {
    flex-basis: 32px;
  }
  .basis-5 {
    flex-basis: 64px;
  }
  .basis-6 {
    flex-basis: 128px;
  }
  .basis-7 {
    flex-basis: 256px;
  }
  .basis-8 {
    flex-basis: 512px;
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
  .grow-0 {
    flex-grow: 0;
  }
  .grow-1 {
    flex-grow: 1px;
  }
  .shrink-0 {
    flex-shrink: 0;
  }
  .shrink-1 {
    flex-shrink: 1px;
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
  .order-0 {
    order: 0;
  }
  .order-1 {
    order: 1px;
  }
  .order-2 {
    order: 2px;
  }
  .order-3 {
    order: 3px;
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
  .w-0 {
    width: 0;
  }
  .w-1 {
    width: 4px;
  }
  .w-2 {
    width: 8px;
  }
  .w-3 {
    width: 16px;
  }
  .w-4 {
    width: 32px;
  }
  .w-5 {
    width: 64px;
  }
  .w-6 {
    width: 128px;
  }
  .w-7 {
    width: 256px;
  }
  .w-8 {
    width: 512px;
  }
  .h-0 {
    height: 0;
  }
  .h-1 {
    height: 4px;
  }
  .h-2 {
    height: 8px;
  }
  .h-3 {
    height: 16px;
  }
  .h-4 {
    height: 32px;
  }
  .h-5 {
    height: 64px;
  }
  .h-6 {
    height: 128px;
  }
  .h-7 {
    height: 256px;
  }
  .h-8 {
    height: 512px;
  }
  .min-w-0 {
    min-width: 0;
  }
  .min-w-1 {
    min-width: 4px;
  }
  .min-w-2 {
    min-width: 8px;
  }
  .min-w-3 {
    min-width: 16px;
  }
  .min-w-4 {
    min-width: 32px;
  }
  .min-w-5 {
    min-width: 64px;
  }
  .min-w-6 {
    min-width: 128px;
  }
  .min-w-7 {
    min-width: 256px;
  }
  .min-w-8 {
    min-width: 512px;
  }
  .max-w-0 {
    max-width: 0;
  }
  .max-w-1 {
    max-width: 4px;
  }
  .max-w-2 {
    max-width: 8px;
  }
  .max-w-3 {
    max-width: 16px;
  }
  .max-w-4 {
    max-width: 32px;
  }
  .max-w-5 {
    max-width: 64px;
  }
  .max-w-6 {
    max-width: 128px;
  }
  .max-w-7 {
    max-width: 256px;
  }
  .max-w-8 {
    max-width: 512px;
  }
  .min-h-0 {
    min-height: 0;
  }
  .min-h-1 {
    min-height: 4px;
  }
  .min-h-2 {
    min-height: 8px;
  }
  .min-h-3 {
    min-height: 16px;
  }
  .min-h-4 {
    min-height: 32px;
  }
  .min-h-5 {
    min-height: 64px;
  }
  .min-h-6 {
    min-height: 128px;
  }
  .min-h-7 {
    min-height: 256px;
  }
  .min-h-8 {
    min-height: 512px;
  }
  .max-h-0 {
    max-height: 0;
  }
  .max-h-1 {
    max-height: 4px;
  }
  .max-h-2 {
    max-height: 8px;
  }
  .max-h-3 {
    max-height: 16px;
  }
  .max-h-4 {
    max-height: 32px;
  }
  .max-h-5 {
    max-height: 64px;
  }
  .max-h-6 {
    max-height: 128px;
  }
  .max-h-7 {
    max-height: 256px;
  }
  .max-h-8 {
    max-height: 512px;
  }
  .m-0 {
    margin: 0px;
  }
  .m-1 {
    margin: 0.25rem;
  }
  .m-2 {
    margin: 0.5rem;
  }
  .m-3 {
    margin: 0.75rem;
  }
  .m-4 {
    margin: 1rem;
  }
  .m-5 {
    margin: 1.25rem;
  }
  .m-6 {
    margin: 1.5rem;
  }
  .m-7 {
    margin: 1.75rem;
  }
  .m-8 {
    margin: 2rem;
  }
  .m-9 {
    margin: 2.25rem;
  }
  .m-10 {
    margin: 2.5rem;
  }
  .m-11 {
    margin: 2.75rem;
  }
  .m-12 {
    margin: 3rem;
  }
  .m-14 {
    margin: 3.5rem;
  }
  .m-16 {
    margin: 4rem;
  }
  .m-20 {
    margin: 5rem;
  }
  .m-24 {
    margin: 6rem;
  }
  .m-28 {
    margin: 7rem;
  }
  .m-32 {
    margin: 8rem;
  }
  .m-36 {
    margin: 9rem;
  }
  .m-40 {
    margin: 10rem;
  }
  .m-44 {
    margin: 11rem;
  }
  .m-48 {
    margin: 12rem;
  }
  .m-52 {
    margin: 13rem;
  }
  .m-56 {
    margin: 14rem;
  }
  .m-60 {
    margin: 15rem;
  }
  .m-64 {
    margin: 16rem;
  }
  .m-72 {
    margin: 18rem;
  }
  .m-80 {
    margin: 20rem;
  }
  .m-96 {
    margin: 24rem;
  }
  .m-px {
    margin: 1px;
  }
  .m-0-5 {
    margin: 0.125rem;
  }
  .m-1-5 {
    margin: 0.375rem;
  }
  .m-2-5 {
    margin: 0.625rem;
  }
  .m-3-5 {
    margin: 0.875rem;
  }
  .mt-0 {
    margin-top: 0px;
  }
  .mt-1 {
    margin-top: 0.25rem;
  }
  .mt-2 {
    margin-top: 0.5rem;
  }
  .mt-3 {
    margin-top: 0.75rem;
  }
  .mt-4 {
    margin-top: 1rem;
  }
  .mt-5 {
    margin-top: 1.25rem;
  }
  .mt-6 {
    margin-top: 1.5rem;
  }
  .mt-7 {
    margin-top: 1.75rem;
  }
  .mt-8 {
    margin-top: 2rem;
  }
  .mt-9 {
    margin-top: 2.25rem;
  }
  .mt-10 {
    margin-top: 2.5rem;
  }
  .mt-11 {
    margin-top: 2.75rem;
  }
  .mt-12 {
    margin-top: 3rem;
  }
  .mt-14 {
    margin-top: 3.5rem;
  }
  .mt-16 {
    margin-top: 4rem;
  }
  .mt-20 {
    margin-top: 5rem;
  }
  .mt-24 {
    margin-top: 6rem;
  }
  .mt-28 {
    margin-top: 7rem;
  }
  .mt-32 {
    margin-top: 8rem;
  }
  .mt-36 {
    margin-top: 9rem;
  }
  .mt-40 {
    margin-top: 10rem;
  }
  .mt-44 {
    margin-top: 11rem;
  }
  .mt-48 {
    margin-top: 12rem;
  }
  .mt-52 {
    margin-top: 13rem;
  }
  .mt-56 {
    margin-top: 14rem;
  }
  .mt-60 {
    margin-top: 15rem;
  }
  .mt-64 {
    margin-top: 16rem;
  }
  .mt-72 {
    margin-top: 18rem;
  }
  .mt-80 {
    margin-top: 20rem;
  }
  .mt-96 {
    margin-top: 24rem;
  }
  .mt-px {
    margin-top: 1px;
  }
  .mt-0-5 {
    margin-top: 0.125rem;
  }
  .mt-1-5 {
    margin-top: 0.375rem;
  }
  .mt-2-5 {
    margin-top: 0.625rem;
  }
  .mt-3-5 {
    margin-top: 0.875rem;
  }
  .mr-0 {
    margin-right: 0px;
  }
  .mr-1 {
    margin-right: 0.25rem;
  }
  .mr-2 {
    margin-right: 0.5rem;
  }
  .mr-3 {
    margin-right: 0.75rem;
  }
  .mr-4 {
    margin-right: 1rem;
  }
  .mr-5 {
    margin-right: 1.25rem;
  }
  .mr-6 {
    margin-right: 1.5rem;
  }
  .mr-7 {
    margin-right: 1.75rem;
  }
  .mr-8 {
    margin-right: 2rem;
  }
  .mr-9 {
    margin-right: 2.25rem;
  }
  .mr-10 {
    margin-right: 2.5rem;
  }
  .mr-11 {
    margin-right: 2.75rem;
  }
  .mr-12 {
    margin-right: 3rem;
  }
  .mr-14 {
    margin-right: 3.5rem;
  }
  .mr-16 {
    margin-right: 4rem;
  }
  .mr-20 {
    margin-right: 5rem;
  }
  .mr-24 {
    margin-right: 6rem;
  }
  .mr-28 {
    margin-right: 7rem;
  }
  .mr-32 {
    margin-right: 8rem;
  }
  .mr-36 {
    margin-right: 9rem;
  }
  .mr-40 {
    margin-right: 10rem;
  }
  .mr-44 {
    margin-right: 11rem;
  }
  .mr-48 {
    margin-right: 12rem;
  }
  .mr-52 {
    margin-right: 13rem;
  }
  .mr-56 {
    margin-right: 14rem;
  }
  .mr-60 {
    margin-right: 15rem;
  }
  .mr-64 {
    margin-right: 16rem;
  }
  .mr-72 {
    margin-right: 18rem;
  }
  .mr-80 {
    margin-right: 20rem;
  }
  .mr-96 {
    margin-right: 24rem;
  }
  .mr-px {
    margin-right: 1px;
  }
  .mr-0-5 {
    margin-right: 0.125rem;
  }
  .mr-1-5 {
    margin-right: 0.375rem;
  }
  .mr-2-5 {
    margin-right: 0.625rem;
  }
  .mr-3-5 {
    margin-right: 0.875rem;
  }
  .mb-0 {
    margin-bottom: 0px;
  }
  .mb-1 {
    margin-bottom: 0.25rem;
  }
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  .mb-3 {
    margin-bottom: 0.75rem;
  }
  .mb-4 {
    margin-bottom: 1rem;
  }
  .mb-5 {
    margin-bottom: 1.25rem;
  }
  .mb-6 {
    margin-bottom: 1.5rem;
  }
  .mb-7 {
    margin-bottom: 1.75rem;
  }
  .mb-8 {
    margin-bottom: 2rem;
  }
  .mb-9 {
    margin-bottom: 2.25rem;
  }
  .mb-10 {
    margin-bottom: 2.5rem;
  }
  .mb-11 {
    margin-bottom: 2.75rem;
  }
  .mb-12 {
    margin-bottom: 3rem;
  }
  .mb-14 {
    margin-bottom: 3.5rem;
  }
  .mb-16 {
    margin-bottom: 4rem;
  }
  .mb-20 {
    margin-bottom: 5rem;
  }
  .mb-24 {
    margin-bottom: 6rem;
  }
  .mb-28 {
    margin-bottom: 7rem;
  }
  .mb-32 {
    margin-bottom: 8rem;
  }
  .mb-36 {
    margin-bottom: 9rem;
  }
  .mb-40 {
    margin-bottom: 10rem;
  }
  .mb-44 {
    margin-bottom: 11rem;
  }
  .mb-48 {
    margin-bottom: 12rem;
  }
  .mb-52 {
    margin-bottom: 13rem;
  }
  .mb-56 {
    margin-bottom: 14rem;
  }
  .mb-60 {
    margin-bottom: 15rem;
  }
  .mb-64 {
    margin-bottom: 16rem;
  }
  .mb-72 {
    margin-bottom: 18rem;
  }
  .mb-80 {
    margin-bottom: 20rem;
  }
  .mb-96 {
    margin-bottom: 24rem;
  }
  .mb-px {
    margin-bottom: 1px;
  }
  .mb-0-5 {
    margin-bottom: 0.125rem;
  }
  .mb-1-5 {
    margin-bottom: 0.375rem;
  }
  .mb-2-5 {
    margin-bottom: 0.625rem;
  }
  .mb-3-5 {
    margin-bottom: 0.875rem;
  }
  .ml-0 {
    margin-left: 0px;
  }
  .ml-1 {
    margin-left: 0.25rem;
  }
  .ml-2 {
    margin-left: 0.5rem;
  }
  .ml-3 {
    margin-left: 0.75rem;
  }
  .ml-4 {
    margin-left: 1rem;
  }
  .ml-5 {
    margin-left: 1.25rem;
  }
  .ml-6 {
    margin-left: 1.5rem;
  }
  .ml-7 {
    margin-left: 1.75rem;
  }
  .ml-8 {
    margin-left: 2rem;
  }
  .ml-9 {
    margin-left: 2.25rem;
  }
  .ml-10 {
    margin-left: 2.5rem;
  }
  .ml-11 {
    margin-left: 2.75rem;
  }
  .ml-12 {
    margin-left: 3rem;
  }
  .ml-14 {
    margin-left: 3.5rem;
  }
  .ml-16 {
    margin-left: 4rem;
  }
  .ml-20 {
    margin-left: 5rem;
  }
  .ml-24 {
    margin-left: 6rem;
  }
  .ml-28 {
    margin-left: 7rem;
  }
  .ml-32 {
    margin-left: 8rem;
  }
  .ml-36 {
    margin-left: 9rem;
  }
  .ml-40 {
    margin-left: 10rem;
  }
  .ml-44 {
    margin-left: 11rem;
  }
  .ml-48 {
    margin-left: 12rem;
  }
  .ml-52 {
    margin-left: 13rem;
  }
  .ml-56 {
    margin-left: 14rem;
  }
  .ml-60 {
    margin-left: 15rem;
  }
  .ml-64 {
    margin-left: 16rem;
  }
  .ml-72 {
    margin-left: 18rem;
  }
  .ml-80 {
    margin-left: 20rem;
  }
  .ml-96 {
    margin-left: 24rem;
  }
  .ml-px {
    margin-left: 1px;
  }
  .ml-0-5 {
    margin-left: 0.125rem;
  }
  .ml-1-5 {
    margin-left: 0.375rem;
  }
  .ml-2-5 {
    margin-left: 0.625rem;
  }
  .ml-3-5 {
    margin-left: 0.875rem;
  }
  .p-0 {
    padding: 0px;
  }
  .p-1 {
    padding: 0.25rem;
  }
  .p-2 {
    padding: 0.5rem;
  }
  .p-3 {
    padding: 0.75rem;
  }
  .p-4 {
    padding: 1rem;
  }
  .p-5 {
    padding: 1.25rem;
  }
  .p-6 {
    padding: 1.5rem;
  }
  .p-7 {
    padding: 1.75rem;
  }
  .p-8 {
    padding: 2rem;
  }
  .p-9 {
    padding: 2.25rem;
  }
  .p-10 {
    padding: 2.5rem;
  }
  .p-11 {
    padding: 2.75rem;
  }
  .p-12 {
    padding: 3rem;
  }
  .p-14 {
    padding: 3.5rem;
  }
  .p-16 {
    padding: 4rem;
  }
  .p-20 {
    padding: 5rem;
  }
  .p-24 {
    padding: 6rem;
  }
  .p-28 {
    padding: 7rem;
  }
  .p-32 {
    padding: 8rem;
  }
  .p-36 {
    padding: 9rem;
  }
  .p-40 {
    padding: 10rem;
  }
  .p-44 {
    padding: 11rem;
  }
  .p-48 {
    padding: 12rem;
  }
  .p-52 {
    padding: 13rem;
  }
  .p-56 {
    padding: 14rem;
  }
  .p-60 {
    padding: 15rem;
  }
  .p-64 {
    padding: 16rem;
  }
  .p-72 {
    padding: 18rem;
  }
  .p-80 {
    padding: 20rem;
  }
  .p-96 {
    padding: 24rem;
  }
  .p-px {
    padding: 1px;
  }
  .p-0-5 {
    padding: 0.125rem;
  }
  .p-1-5 {
    padding: 0.375rem;
  }
  .p-2-5 {
    padding: 0.625rem;
  }
  .p-3-5 {
    padding: 0.875rem;
  }
  .pt-0 {
    padding-top: 0px;
  }
  .pt-1 {
    padding-top: 0.25rem;
  }
  .pt-2 {
    padding-top: 0.5rem;
  }
  .pt-3 {
    padding-top: 0.75rem;
  }
  .pt-4 {
    padding-top: 1rem;
  }
  .pt-5 {
    padding-top: 1.25rem;
  }
  .pt-6 {
    padding-top: 1.5rem;
  }
  .pt-7 {
    padding-top: 1.75rem;
  }
  .pt-8 {
    padding-top: 2rem;
  }
  .pt-9 {
    padding-top: 2.25rem;
  }
  .pt-10 {
    padding-top: 2.5rem;
  }
  .pt-11 {
    padding-top: 2.75rem;
  }
  .pt-12 {
    padding-top: 3rem;
  }
  .pt-14 {
    padding-top: 3.5rem;
  }
  .pt-16 {
    padding-top: 4rem;
  }
  .pt-20 {
    padding-top: 5rem;
  }
  .pt-24 {
    padding-top: 6rem;
  }
  .pt-28 {
    padding-top: 7rem;
  }
  .pt-32 {
    padding-top: 8rem;
  }
  .pt-36 {
    padding-top: 9rem;
  }
  .pt-40 {
    padding-top: 10rem;
  }
  .pt-44 {
    padding-top: 11rem;
  }
  .pt-48 {
    padding-top: 12rem;
  }
  .pt-52 {
    padding-top: 13rem;
  }
  .pt-56 {
    padding-top: 14rem;
  }
  .pt-60 {
    padding-top: 15rem;
  }
  .pt-64 {
    padding-top: 16rem;
  }
  .pt-72 {
    padding-top: 18rem;
  }
  .pt-80 {
    padding-top: 20rem;
  }
  .pt-96 {
    padding-top: 24rem;
  }
  .pt-px {
    padding-top: 1px;
  }
  .pt-0-5 {
    padding-top: 0.125rem;
  }
  .pt-1-5 {
    padding-top: 0.375rem;
  }
  .pt-2-5 {
    padding-top: 0.625rem;
  }
  .pt-3-5 {
    padding-top: 0.875rem;
  }
  .pr-0 {
    padding-right: 0px;
  }
  .pr-1 {
    padding-right: 0.25rem;
  }
  .pr-2 {
    padding-right: 0.5rem;
  }
  .pr-3 {
    padding-right: 0.75rem;
  }
  .pr-4 {
    padding-right: 1rem;
  }
  .pr-5 {
    padding-right: 1.25rem;
  }
  .pr-6 {
    padding-right: 1.5rem;
  }
  .pr-7 {
    padding-right: 1.75rem;
  }
  .pr-8 {
    padding-right: 2rem;
  }
  .pr-9 {
    padding-right: 2.25rem;
  }
  .pr-10 {
    padding-right: 2.5rem;
  }
  .pr-11 {
    padding-right: 2.75rem;
  }
  .pr-12 {
    padding-right: 3rem;
  }
  .pr-14 {
    padding-right: 3.5rem;
  }
  .pr-16 {
    padding-right: 4rem;
  }
  .pr-20 {
    padding-right: 5rem;
  }
  .pr-24 {
    padding-right: 6rem;
  }
  .pr-28 {
    padding-right: 7rem;
  }
  .pr-32 {
    padding-right: 8rem;
  }
  .pr-36 {
    padding-right: 9rem;
  }
  .pr-40 {
    padding-right: 10rem;
  }
  .pr-44 {
    padding-right: 11rem;
  }
  .pr-48 {
    padding-right: 12rem;
  }
  .pr-52 {
    padding-right: 13rem;
  }
  .pr-56 {
    padding-right: 14rem;
  }
  .pr-60 {
    padding-right: 15rem;
  }
  .pr-64 {
    padding-right: 16rem;
  }
  .pr-72 {
    padding-right: 18rem;
  }
  .pr-80 {
    padding-right: 20rem;
  }
  .pr-96 {
    padding-right: 24rem;
  }
  .pr-px {
    padding-right: 1px;
  }
  .pr-0-5 {
    padding-right: 0.125rem;
  }
  .pr-1-5 {
    padding-right: 0.375rem;
  }
  .pr-2-5 {
    padding-right: 0.625rem;
  }
  .pr-3-5 {
    padding-right: 0.875rem;
  }
  .pb-0 {
    padding-bottom: 0px;
  }
  .pb-1 {
    padding-bottom: 0.25rem;
  }
  .pb-2 {
    padding-bottom: 0.5rem;
  }
  .pb-3 {
    padding-bottom: 0.75rem;
  }
  .pb-4 {
    padding-bottom: 1rem;
  }
  .pb-5 {
    padding-bottom: 1.25rem;
  }
  .pb-6 {
    padding-bottom: 1.5rem;
  }
  .pb-7 {
    padding-bottom: 1.75rem;
  }
  .pb-8 {
    padding-bottom: 2rem;
  }
  .pb-9 {
    padding-bottom: 2.25rem;
  }
  .pb-10 {
    padding-bottom: 2.5rem;
  }
  .pb-11 {
    padding-bottom: 2.75rem;
  }
  .pb-12 {
    padding-bottom: 3rem;
  }
  .pb-14 {
    padding-bottom: 3.5rem;
  }
  .pb-16 {
    padding-bottom: 4rem;
  }
  .pb-20 {
    padding-bottom: 5rem;
  }
  .pb-24 {
    padding-bottom: 6rem;
  }
  .pb-28 {
    padding-bottom: 7rem;
  }
  .pb-32 {
    padding-bottom: 8rem;
  }
  .pb-36 {
    padding-bottom: 9rem;
  }
  .pb-40 {
    padding-bottom: 10rem;
  }
  .pb-44 {
    padding-bottom: 11rem;
  }
  .pb-48 {
    padding-bottom: 12rem;
  }
  .pb-52 {
    padding-bottom: 13rem;
  }
  .pb-56 {
    padding-bottom: 14rem;
  }
  .pb-60 {
    padding-bottom: 15rem;
  }
  .pb-64 {
    padding-bottom: 16rem;
  }
  .pb-72 {
    padding-bottom: 18rem;
  }
  .pb-80 {
    padding-bottom: 20rem;
  }
  .pb-96 {
    padding-bottom: 24rem;
  }
  .pb-px {
    padding-bottom: 1px;
  }
  .pb-0-5 {
    padding-bottom: 0.125rem;
  }
  .pb-1-5 {
    padding-bottom: 0.375rem;
  }
  .pb-2-5 {
    padding-bottom: 0.625rem;
  }
  .pb-3-5 {
    padding-bottom: 0.875rem;
  }
  .pl-0 {
    padding-left: 0px;
  }
  .pl-1 {
    padding-left: 0.25rem;
  }
  .pl-2 {
    padding-left: 0.5rem;
  }
  .pl-3 {
    padding-left: 0.75rem;
  }
  .pl-4 {
    padding-left: 1rem;
  }
  .pl-5 {
    padding-left: 1.25rem;
  }
  .pl-6 {
    padding-left: 1.5rem;
  }
  .pl-7 {
    padding-left: 1.75rem;
  }
  .pl-8 {
    padding-left: 2rem;
  }
  .pl-9 {
    padding-left: 2.25rem;
  }
  .pl-10 {
    padding-left: 2.5rem;
  }
  .pl-11 {
    padding-left: 2.75rem;
  }
  .pl-12 {
    padding-left: 3rem;
  }
  .pl-14 {
    padding-left: 3.5rem;
  }
  .pl-16 {
    padding-left: 4rem;
  }
  .pl-20 {
    padding-left: 5rem;
  }
  .pl-24 {
    padding-left: 6rem;
  }
  .pl-28 {
    padding-left: 7rem;
  }
  .pl-32 {
    padding-left: 8rem;
  }
  .pl-36 {
    padding-left: 9rem;
  }
  .pl-40 {
    padding-left: 10rem;
  }
  .pl-44 {
    padding-left: 11rem;
  }
  .pl-48 {
    padding-left: 12rem;
  }
  .pl-52 {
    padding-left: 13rem;
  }
  .pl-56 {
    padding-left: 14rem;
  }
  .pl-60 {
    padding-left: 15rem;
  }
  .pl-64 {
    padding-left: 16rem;
  }
  .pl-72 {
    padding-left: 18rem;
  }
  .pl-80 {
    padding-left: 20rem;
  }
  .pl-96 {
    padding-left: 24rem;
  }
  .pl-px {
    padding-left: 1px;
  }
  .pl-0-5 {
    padding-left: 0.125rem;
  }
  .pl-1-5 {
    padding-left: 0.375rem;
  }
  .pl-2-5 {
    padding-left: 0.625rem;
  }
  .pl-3-5 {
    padding-left: 0.875rem;
  }
  .font-family-body {
    font-family: -apple-system, "Segoe UI", "Roboto", "Helvetica Neue", Arial,
      "Noto Sans", "Liberation Sans", "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol", "Noto Color Emoji" !default;
  }
  .font-family-mono {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
  }
  .font-size-0 {
    font-size: 12px;
  }
  .font-size-1 {
    font-size: 14px;
  }
  .font-size-2 {
    font-size: 16px;
  }
  .font-size-3 {
    font-size: 20px;
  }
  .font-size-4 {
    font-size: 24px;
  }
  .font-size-5 {
    font-size: 32px;
  }
  .font-size-6 {
    font-size: 48px;
  }
  .font-size-7 {
    font-size: 64px;
  }
  .font-weight-body {
    font-weight: 400px;
  }
  .font-weight-bold {
    font-weight: 700px;
  }
  .line-height-body {
    line-height: 1.5px;
  }
  .line-height-heading {
    line-height: 1.125px;
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
