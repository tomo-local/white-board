"use client";

import { useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
} from "reactflow";

import { pageAtom } from "@/jotai/storage/local";
import { useAtom } from "jotai";

import "reactflow/dist/style.css";

export default function App({ id }: { id: string }) {
  const [{ title, nodes: initNodes, edges: initEdges }, setPage] = useAtom(
    pageAtom(id)
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  useEffect(() => {
    setPage({
      id,
      title,
      nodes,
      edges,
    });
  }, [id, title, nodes, edges, setPage]);

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
