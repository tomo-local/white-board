"use client";
import { type Edge, type Node, ReactFlowProvider } from "reactflow";

import styles from "@/app/reactflow/page.module.css";
import Flow from "@/components/Flow";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: { label: "Node 3" },
    position: { x: 400, y: 100 },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
];

function fetchData() {
  return { nodes: initialNodes, edges: initialEdges };
}

export default function ReactFlow() {
  const { nodes, edges } = fetchData();

  return (
    <main className={styles.main}>
      <ReactFlowProvider>
        <Flow nodes={nodes} edges={edges} />
      </ReactFlowProvider>
    </main>
  );
}
