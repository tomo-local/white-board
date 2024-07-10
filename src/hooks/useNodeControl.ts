import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";

import type { NodeProps } from "reactflow";
import { useAtomCallback } from "jotai/utils";
import type { NodeData } from "@/jotai/flow/node";
import { nodesAtom } from "@/jotai/flow/page";

export const useNodeControl = (initNode: NodeProps<NodeData>) => {
  const { id }: { id: string } = useParams();
  const [data, setData] = useState(initNode);

  useEffect(() => {
    setData(initNode);
  }, [initNode]);

  return {
    data,
    onChange: (newData: NodeProps<NodeData>) => setData(newData),
    onSave: useAtomCallback(
      useCallback(
        (get, set) => {
          const nodes = get(nodesAtom(id));
          const newNodes = nodes.map((n) =>
            n.id === data.id ? { ...n, data: data.data } : n
          );
          set(nodesAtom(id), newNodes);
        },
        [data, id]
      )
    ),
  };
};
