// from https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
export const globalHtmlAttributes = [
  'accesskey',
  'contenteditable',
  'draggable',
  'id',
  'lang',
  'spellcheck',
  'tabindex',
  'title',
  'translate',
]

export const htmlAttributes = {
  a: [
    'download',
    'href',
    'hreflang',
    'media',
    'ping',
    'referrerpolicy',
    'ref',
    'target',
  ],
  abbr: [],
  audio: [
    'autoplay',
    'buffered',
    'controls',
    'crossorigin',
    'height',
    'loop',
    'muted',
    'preload',
    'src',
    'width',
  ],
  blockquote: ['cite'],
  button: [
    'autofocus',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'name',
    'type',
    'value',
  ],
  code: [],
  del: ['cite', 'datetime'],
  div: [],
  dfn: [],
  em: [],
  figcaption: [],
  footer: [],
  form: ['autocomplete'],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  header: [],
  img: [
    'crossorigin',
    'decoding',
    'height',
    'loading',
    'referrerpolicy',
    'sizes',
    'src',
    'srcset',
    'width',
  ],
  ins: ['cite', 'datetime'],
  kbd: [],
  label: ['for', 'form'],
  li: ['value'],
  main: [],
  mark: [],
  nav: [],
  ol: ['reversed', 'start'],
  p: [],
  pre: [],
  q: ['cite'],
  section: [],
  select: [
    'autocomplete',
    'autofocus',
    'disabled',
    'multiple',
    'name',
    'required',
    'size',
  ],
  small: [],
  span: [],
  strong: [],
  table: [],
  td: ['colspan', 'headers', 'rowspan'],
  th: ['colspan', 'headers', 'rowspan'],
  time: ['datetime'],
  tr: [],
  ul: [],
  var: [],
  video: [
    'autoplay',
    'buffered',
    'controls',
    'crossorigin',
    'height',
    'loop',
    'muted',
    'poster',
    'preload',
    'src',
    'width',
  ],
}

export const htmlTags = Object.keys(htmlAttributes)

export const voidHtmlElementTags = ['img', 'input']