import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import type { Node, Edge } from "reactflow";
import {
  pageLocalAtom,
  initialNodes,
  initialEdges,
} from "@/jotai/storage/local";

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
  atom(
    (get) => {
      const selectedNode = get(pageAtom(id));
      const selectedNodeId = get(selectedNodeIdAtom);
      return selectedNode.nodes.find((node) => node.id === selectedNodeId);
    },
  )
);
