import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import type { Node } from "reactflow";
import { pagesAtom } from "@/jotai/storage/local";
import { v4 as uuid } from "uuid";

export type NodeData = {
  label: string;
};

const defaultNodeData: Node<NodeData> = {
  id: uuid(),
  type: "normal",
  position: { x: 100, y: 100 },
  data: { label: "node" },
};

export const nodeAtom = atomFamily((id: string) =>
  atom(
    (get) => {
      const pages = get(pagesAtom);
      const nodes = pages.flatMap((page) => page.nodes);
      return nodes.find((node) => node.id === id) || defaultNodeData;
    },
    (get, set, update: Node<NodeData>) => {
      const pages = get(pagesAtom);
      const page = pages.find((page) =>
        page.nodes.some((node) => node.id === update.id)
      );

      if (page) {
        page.nodes = page.nodes.map((node) => (node.id === id ? update : node));
        set(pagesAtom, pages);
      }
    }
  )
);
