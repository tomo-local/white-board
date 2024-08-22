import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";

import {
  type NodeProps,
  type XYPosition,
  type Connection,
  Position,
} from "@xyflow/react";
import { useAtomCallback } from "jotai/utils";
import { nodesAtom } from "@/jotai/flow/page";
import type { CustomNodeTypes } from "@/jotai/flow/panel";
import { useFlowStore } from "@/hooks/useFlowStore";
import type { CustomNodes as Node } from "@/types/flow";

const buildConnection = (
  type: Position,
  currentNodeId: string,
  nextNodeId: string
): Connection => {
  switch (type) {
    case Position.Top:
      return {
        source: currentNodeId,
        sourceHandle: Position.Top,
        target: nextNodeId,
        targetHandle: Position.Bottom,
      };
    case Position.Right:
      return {
        source: currentNodeId,
        sourceHandle: Position.Right,
        target: nextNodeId,
        targetHandle: Position.Left,
      };

    case Position.Left:
      return {
        source: nextNodeId,
        sourceHandle: Position.Right,
        target: currentNodeId,
        targetHandle: Position.Left,
      };
    case Position.Bottom:
      return {
        source: nextNodeId,
        sourceHandle: Position.Top,
        target: currentNodeId,
        targetHandle: Position.Bottom,
      };
  }
};

export const updateNodeData = (
  node: Node,
  data: Record<string, unknown>
): Node => {
  switch (node.type) {
    case "markdown":
      return {
        ...node,
        data: {
          ...node.data,
          ...data,
          update_at: new Date().toISOString(),
        },
      };
    case "document":
      return {
        ...node,
        data: {
          ...node.data,
          ...data,
          update_at: new Date().toISOString(),
        },
      };
  }
};

export const useNodeControl = () => {
  const { id }: { id: string } = useParams();
  const { addNode, addEdge } = useFlowStore();

  return {
    addNodeWithEdge: (
      type: CustomNodeTypes,
      id: Node["id"] | NodeProps<Node>["id"],
      position: Position,
      positionXY: XYPosition
    ) => {
      const newNode = addNode(type, positionXY);
      const connection = buildConnection(position, id, newNode.id);
      addEdge({
        ...connection,
      });
    },
    onDelete: useAtomCallback(
      useCallback(
        (get, set, node: Node | NodeProps<Node>) => {
          const nodes = get(nodesAtom(id));
          const index = nodes.findIndex((n) => n.id === node.id);

          if (!index) {
            return;
          }

          const newNodes = [...nodes];

          newNodes.splice(index, 1);

          set(nodesAtom(id), newNodes);
        },
        [id]
      )
    ),
    onSave: useAtomCallback(
      useCallback(
        (get, set, node: Node | NodeProps<Node>) => {
          const nodes = get(nodesAtom(id));
          const index = nodes.findIndex((n) => n.id === node.id);

          if (!index) {
            return;
          }

          const newNodes = [...nodes];

          newNodes[index] = updateNodeData(newNodes[index], node.data);

          set(nodesAtom(id), newNodes);
        },
        [id]
      )
    ),
  };
};
