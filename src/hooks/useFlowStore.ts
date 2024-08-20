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
import type { MarkdownNode } from "@/components/custom/node/Markdown";

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
        (get, set, change: NodeChange<MarkdownNode>[]) => {
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
          position: Position,
          optionId?: string
        ) => {
          const nodes = get(nodesAtom(id));
          const { x, y } = position;
          const newNode: MarkdownNode = {
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
