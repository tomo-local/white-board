import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import type { Node } from "@xyflow/react";

import { useAtomValue, useAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";

import {
  selectedNodeAtom,
  selectedNodeIdAtom,
  beforeAndAfterNodeAtom,
  nodesAtom,
} from "@/jotai/flow/page";

type NodeData = Pick<Node, "data">;

export const useNodeEditorControl = () => {
  const { id }: { id: string } = useParams();
  const [selectedNodeId, selectNodeId] = useAtom(selectedNodeIdAtom);
  const node = useAtomValue(selectedNodeAtom(id));
  const { before, after } = useAtomValue(beforeAndAfterNodeAtom(id));

  const [realTimeNode, setRealTimeNode] = useState(node?.data);

  useEffect(() => {
    setRealTimeNode(node?.data);
  }, [node]);

  return {
    node,
    nodeData: realTimeNode,
    selectId: selectedNodeId,
    select: selectNodeId,
    before,
    after,
    resetNodeId: () => {
      selectNodeId(null);
    },
    onChange: (newData: NodeData) => {
      setRealTimeNode(newData);
    },
    onDelete: useAtomCallback(
      useCallback(
        (get, set) => {
          if (!node) {
            return;
          }

          const nodes = get(nodesAtom(id));
          const newNodes = nodes.filter((n) => n.id !== node.id);
          set(nodesAtom(id), newNodes);
        },
        [node, id]
      )
    ),
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
