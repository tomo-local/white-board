import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import type { Edge } from "@xyflow/react";
import {
  pageLocalAtom,
  initialNodes,
  initialEdges,
} from "@/jotai/storage/local";
import type { CustomNodes as Node } from "@/types/flow";


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
