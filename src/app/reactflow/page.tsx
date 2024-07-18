"use client";

import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "reactflow";

import { useAtomValue } from "jotai";
import styles from "@/app/reactflow/page.module.css";
import { defaultNodes, defaultEdges } from "@/jotai/storage/session";

export default function ReactFlowPage() {
  const initNodes = useAtomValue(defaultNodes);
  const initEdges = useAtomValue(defaultEdges);

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  return (
    <main className={styles.main}>
      <ReactFlowProvider>
        <div style={{ width: "100vw", height: "100vh" }}>
          <ReactFlow
            proOptions={{ hideAttribution: true }}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
          />
        </div>
      </ReactFlowProvider>
    </main>
  );
}
