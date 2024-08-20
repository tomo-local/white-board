import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import type { Edge } from "@xyflow/react";
import {
  pageLocalAtom,
  initialNodes,
  initialEdges,
} from "@/jotai/storage/local";
import type { MarkdownNode } from "@/components/custom/node/Markdown";

type Node = MarkdownNode;

export const pageAtom = atomFamily((id: string) => pageLocalAtom(id));

export const nodesAtom = atomFamily((id: string) =>
  atom(
    (get) => get(pageAtom(id))?.nodes || initialNodes,
    (get, set, update: Node[]) => {
      set(pageAtom(id), {
        ...get(pageAtom(id)),
        nodes: update,
      });
    }
  )
);

export const edgesAtom = atomFamily((id: string) =>
  atom(
    (get) => get(pageAtom(id))?.edges || initialEdges,
    (get, set, update: Edge[]) => {
      set(pageAtom(id), {
        ...get(pageAtom(id)),
        edges: update,
      });
    }
  )
);

export const selectedNodeIdAtom = atom<string | null>(null);

export const selectedNodeAtom = atomFamily((id: string) =>
  atom((get) => {
    const page = get(pageAtom(id));
    const selectedNodeId = get(selectedNodeIdAtom);

    if (!selectedNodeId) {
      return null;
    }

    const targetNode = page.nodes.find((node) => node.id === selectedNodeId);

    if (!targetNode) {
      return null;
    }

    return targetNode;
  })
);

export const beforeAndAfterNodeAtom = atomFamily((id: string) =>
  atom((get) => {
    const page = get(pageAtom(id));
    const selectedNodeId = get(selectedNodeIdAtom);

    const result: {
      before: Node | null;
      after: Node | null;
    } = { before: null, after: null };

    if (!selectedNodeId) {
      return result;
    }

    const index = page.nodes.findIndex((node) => node.id === selectedNodeId);

    if (index > 0) {
      result.before = page.nodes[index - 1];
    }

    if (page.nodes.length - 1 > index) {
      result.after = page.nodes[index + 1];
    }

    return result;
  })
);
