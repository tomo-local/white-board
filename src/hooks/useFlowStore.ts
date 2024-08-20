import { useCallback } from "react";
import { useParams } from "next/navigation";

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type EdgeChange,
  type NodeChange,
  type Connection,
} from "@xyflow/react";
import { useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";

import { nodesAtom, edgesAtom } from "@/jotai/flow/page";
import type { CustomNodeTypes } from "@/jotai/flow/panel";
import { v4 as uuid } from "uuid";
import type { CustomNodes as Node } from "@/types/flow";

type Position = {
  x: number;
  y: number;
};

export const useFlowStore = () => {
  const { id }: { id: string } = useParams();

  return {
    id,
    nodes: useAtomValue(nodesAtom(id)),
    edges: useAtomValue(edgesAtom(id)),
    onNodesChange: useAtomCallback(
      useCallback(
        (get, set, change: NodeChange<Node>[]) => {
          const nodes = get(nodesAtom(id));
          set(nodesAtom(id), applyNodeChanges(change, nodes));
        },
        [id]
      )
    ),
    onEdgesChange: useAtomCallback(
      useCallback(
        (get, set, change: EdgeChange[]) => {
          const edges = get(edgesAtom(id));
          set(edgesAtom(id), applyEdgeChanges(change, edges));
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
          position: Position,
          optionId?: string
        ) => {
          const nodes = get(nodesAtom(id));
          const { x, y } = position;
          const newNode: Node = {
            id: optionId || uuid(),
            type: "markdown",
            dragHandle: ".custom-drag-handle",
            position: {
              x: x,
              y: y,
            },
            data: {
              label: `Node ${nodes.length}`,
              context: "Sample",
              created_at: new Date().toISOString(),
              update_at: new Date().toISOString(),
            },
          };

          const newNodes = [...nodes, newNode];

          set(nodesAtom(id), newNodes);

          return newNode;
        },
        [id]
      )
    ),
    addEdge: useAtomCallback(
      useCallback(
        (get, set, connection: Connection) => {
          const edges = get(edgesAtom(id));

          const newEdges = addEdge(connection, edges);

          set(edgesAtom(id), newEdges);

          return newEdges;
        },
        [id]
      )
    ),
  };
};
