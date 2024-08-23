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
import { v4 as uuid } from "uuid";
import type {
  CustomNodes as Node,
  MarkdownNode,
  MemoNode,
  CustomNodeTypes,
} from "@/types/flow";

type Position = {
  x: number;
  y: number;
};

type InputNode = {
  type: CustomNodeTypes;
  position: Position;
  data?: Node["data"];
};

const createNode = ({ type, position, data }: InputNode) => {
  switch (type) {
    case "markdown":
      return {
        id: uuid(),
        type,
        dragHandle: ".custom-drag-handle",
        position,
        data: {
          ...data,
          label: "カード",
          context: "# Title",
        },
      } as MarkdownNode;
    case "memo":
      return {
        id: uuid(),
        type,
        dragHandle: ".custom-drag-handle",
        position,
        width: 180,
        height: 180,
        data: {
          ...data,
          context: null,
        },
      } as MemoNode;
  }
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
          const newNode = createNode({
            type,
            position: { x, y },
          });

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
