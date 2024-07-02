import { useCallback } from "react";
import {
  applyEdgeChanges,
  applyNodeChanges,
  type EdgeChange,
  type NodeChange,
} from "reactflow";
import { useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";

import { nodesAtom, edgesAtom } from "@/jotai/flow/page";

export const useFlowStore = (id: string) => {
  return {
    id,
    nodes: useAtomValue(nodesAtom(id)),
    edges: useAtomValue(edgesAtom(id)),
    onNodesChange: useAtomCallback(
      useCallback(
        (get, set, change: NodeChange[]) => {
          const nodes = get(nodesAtom(id));
          const newNodes = applyNodeChanges(change, nodes);
          set(nodesAtom(id), newNodes);
        },
        [id]
      )
    ),
    onEdgesChange: useAtomCallback(
      useCallback(
        (get, set, change: EdgeChange[]) => {
          const edges = get(edgesAtom(id));
          const newEdges = applyEdgeChanges(change, edges);
          set(edgesAtom(id), newEdges);
        },
        [id]
      )
    ),
  };
};
