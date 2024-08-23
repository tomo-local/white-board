import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

import { pageAtom } from "@/jotai/flow/page";

import type { CustomNodes as Node } from "@/types/flow";

export const selectNodeIdAtom = atom<string | null>(null);

export const selectedNodeAtom = atomFamily((id: string) =>
  atom((get) => {
    const targetId = get(selectNodeIdAtom);
    const page = get(pageAtom(id));

    if (!targetId) {
      return null;
    }

    const targetNode = page.nodes.find((node) => node.id === targetId);

    if (!targetNode) {
      return null;
    }

    return targetNode;
  })
);

export const prevAndNextNodeAtom = atomFamily((id: string) =>
  atom((get) => {
    const targetId = get(selectNodeIdAtom);
    const page = get(pageAtom(id));

    const result: {
      previous: Node | null;
      next: Node | null;
    } = { previous: null, next: null };

    if (!targetId) {
      return result;
    }

    const nodes = page.nodes.filter((node) => node.type === "markdown");

    const index = nodes.findIndex((node) => node.id === targetId);

    if (index > 0) {
      result.previous = nodes[index - 1];
    }

    if (page.nodes.length - 1 > index) {
      result.next = nodes[index + 1];
    }

    return result;
  })
);
