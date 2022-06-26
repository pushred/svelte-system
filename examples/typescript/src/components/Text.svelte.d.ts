import { SvelteComponentTyped } from "svelte";
import { ColorsValues } from "./types";

export interface TextProps {
  color?: ColorsValues;
}

export default class Text extends SvelteComponentTyped<TextProps, {}, {}> {}
