import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import type { Node } from "reactflow";

import { useAtomValue, useSetAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";

import {
  selectedNodeAtom,
  selectedNodeIdAtom,
  nodesAtom,
} from "@/jotai/flow/page";

type NodeData = Pick<Node, "data">;

export const useNodeEditorControl = () => {
  const { id }: { id: string } = useParams();
  const selectNodeId = useSetAtom(selectedNodeIdAtom);
  const node = useAtomValue(selectedNodeAtom(id));

  const [realTimeNode, setRealTimeNode] = useState(node?.data);

  useEffect(() => {
    setRealTimeNode(node?.data);
  }, [node]);

  return {
    node,
    nodeData: realTimeNode,
    selectNodeId,
    resetNodeId: () => {
      selectNodeId(null);
    },
    onChange: (newData: NodeData) => {
      setRealTimeNode(newData);
    },
    onSave: useAtomCallback(
      useCallback(
        (get, set) => {
          if (!realTimeNode) {
            return;
          }

          const nodes = get(nodesAtom(id));
          const index = nodes.findIndex((n) => n.id === node?.id);

          if (index === -1) {
            return;
          }

          const newNodes = [...nodes];
          newNodes[index] = {
            ...newNodes[index],
            data: {
              ...realTimeNode,
              update_at: new Date().toISOString(),
            },
          };
          set(nodesAtom(id), newNodes);
        },
        [realTimeNode, node, id]
      )
    ),
  };
};
