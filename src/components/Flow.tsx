"use client";
import ReactFlow from "reactflow";

import { useFlowStore } from "@/hooks/useFlowStore";

import "reactflow/dist/style.css";

export default function App({ id }: { id: string }) {
  const { nodes, edges, onNodesChange, onEdgesChange } = useFlowStore(id);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        proOptions={{ hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      />
    </div>
  );
}
