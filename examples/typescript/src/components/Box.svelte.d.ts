import { SvelteComponentTyped } from "svelte";
import { ColorsValues } from "./types";

export interface BoxProps {
  color?: ColorsValues;
}

export default class Box extends SvelteComponentTyped<BoxProps, {}, {}> {}
