import { SvelteComponentTyped } from "svelte";
import { ColorsValues } from "./types";

export interface FlexProps {
  color?: ColorsValues;
}

export default class Flex extends SvelteComponentTyped<FlexProps, {}, {}> {}
