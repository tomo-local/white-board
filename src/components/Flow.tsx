"use client";
import ReactFlow, { MiniMap } from "reactflow";

import { useFlowStore } from "@/hooks/useFlowStore";
import { useSidePanelControl } from "@/hooks/useSidePanelControl";
import MarkdownNode from "@/components/custom/MarkdownNode";
import SidePanel from "@/components/SidePanel";

import "reactflow/dist/style.css";

const nodeTypes = {
  markdown: MarkdownNode,
};

export default function App({ id }: { id: string }) {
  const { nodes, edges, onNodesChange, onEdgesChange, addNode, addEdge } =
    useFlowStore(id);

  const { onPanelClick } = useSidePanelControl();

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onPaneClick={(e) => onPanelClick(e, addNode)}
        onConnect={addEdge}
        fitView
      >
        <MiniMap />
        <SidePanel />
      </ReactFlow>
    </div>
  );
}
