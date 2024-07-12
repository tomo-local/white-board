import { useCallback, type MouseEvent } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  type EdgeChange,
  type NodeChange,
  type Connection,
} from "reactflow";
import { useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";

import { nodesAtom, edgesAtom } from "@/jotai/flow/page";
import type { CustomNodeTypes } from "@/jotai/flow/panel";
import { v4 as uuid } from "uuid";

export const useFlowStore = (id: string) => {
  const { screenToFlowPosition } = useReactFlow();

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
    addNode: useAtomCallback(
      useCallback(
        (
          get,
          set,
          type: CustomNodeTypes,
          event: MouseEvent<Element, globalThis.MouseEvent>
        ) => {
          if (!type) {
            return;
          }

          const nodes = get(nodesAtom(id));
          const { x, y } = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          });

          set(nodesAtom(id), [
            ...nodes,
            {
              id: uuid(),
              type: type,
              position: {
                x: x - 100,
                y: y - 50,
              },
              data: { label: `Node ${nodes.length}` },
            },
          ]);
        },
        [id, screenToFlowPosition]
      )
    ),
    addEdge: useAtomCallback(
      useCallback(
        (get, set, connection: Connection) => {
          const edges = get(edgesAtom(id));
          set(edgesAtom(id), addEdge(connection, edges));
        },
        [id]
      )
    ),
  };
};
