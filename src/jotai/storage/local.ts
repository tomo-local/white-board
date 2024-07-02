import type { Edge, Node } from "reactflow";
import { atomWithStorage } from "jotai/utils";

export type Page = {
  id: string;
  title: string;
  nodes: Node[];
  edges: Edge[];
};

export const pagesAtom = atomWithStorage("wb-pages", [] as Page[], undefined, {
  getOnInit: true,
});

