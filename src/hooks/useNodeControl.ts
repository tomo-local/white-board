import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";

import {
  type NodeProps,
  type XYPosition,
  type Connection,
  Position,
} from "reactflow";
import { useAtomCallback } from "jotai/utils";
import { nodesAtom } from "@/jotai/flow/page";
import type { CustomNodeTypes } from "@/jotai/flow/panel";
import { useFlowStore } from "@/hooks/useFlowStore";

type NodeData = {
  label: string;
};

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

export const useNodeControl = (initNode: NodeProps<NodeData>) => {
  const { id }: { id: string } = useParams();
  const { addNode, addEdge } = useFlowStore();
  const [node, setNode] = useState(initNode);

  useEffect(() => {
    setNode(initNode);
  }, [initNode]);

  return {
    node,
    addNodeWithEdge: (
      type: CustomNodeTypes,
      position: Position,
      positionXY: XYPosition
    ) => {
      const newNode = addNode(type, positionXY);
      const connection = buildConnection(position, node.id, newNode.id);
      addEdge({
        ...connection,
      });
    },
    onChange: (newData: NodeProps<NodeData>) => setNode(newData),
    onSave: useAtomCallback(
      useCallback(
        (get, set) => {
          const nodes = get(nodesAtom(id));
          const index = nodes.findIndex((n) => n.id === node.id);

          if (index === -1) {
            return;
          }

          const newNodes = [...nodes];
          newNodes[index] = {
            ...newNodes[index],
            data: node.data,
          };
          set(nodesAtom(id), newNodes);
        },
        [node, id]
      )
    ),
  };
};
