import { useCallback } from "react";
import { useParams } from "next/navigation";

import type { NodeProps, XYPosition, Position } from "@xyflow/react";
import { useAtomCallback } from "jotai/utils";
import { nodesAtom } from "@/jotai/flow/page";
import { useFlowStore } from "@/hooks/useFlowStore";
import { updateNodeData, buildConnection } from "@/utils/flow";
import type { CustomNodes as Node, CustomNodeTypes } from "@/types/flow";

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
