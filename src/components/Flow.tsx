"use client";
import ReactFlow from "reactflow";

import { useFlowStore } from "@/hooks/useFlowStore";
import NormalNode from "@/components/custom/NormalNode";

import "reactflow/dist/style.css";

const nodeTypes = {
  normal: NormalNode,
};

export default function App({ id }: { id: string }) {
  const { nodes, edges, onNodesChange, onEdgesChange } = useFlowStore(id);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      />
    </div>
  );
}
