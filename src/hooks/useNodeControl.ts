import { useState, useEffect } from "react";
import type { NodeProps } from "reactflow";
import { useAtom } from "jotai";

import { nodeAtom, type NodeData } from "@/jotai/flow/node";

export const useNodeControl = (initNode: NodeProps<NodeData>) => {
  const [data, setData] = useState(initNode.data);
  const [node, setNode] = useAtom(nodeAtom(initNode.id));

  useEffect(() => {
    setData(data);
  }, [data]);

  return {
    data,
    onChange: (newData: NodeData) => setData(newData),
    onSave: () => {
      setNode({ ...node, data });
    },
  };
};
