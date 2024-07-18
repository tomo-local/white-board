"use client";
import ReactFlow, { MiniMap } from "reactflow";

import { useFlowStore } from "@/hooks/useFlowStore";
import { useSidePanelControl } from "@/hooks/useSidePanelControl";

import MarkdownNode from "@/components/custom/node/Markdown";
import SidePanel from "@/components/SidePanel";

import "reactflow/dist/style.css";

const nodeTypes = {
  markdown: MarkdownNode,
};

export default function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, addNode, addEdge } =
    useFlowStore();

  const { onPanelClick } = useSidePanelControl(addNode);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onPaneClick={onPanelClick}
        onConnect={addEdge}
      >
        <MiniMap />
        <SidePanel />
      </ReactFlow>
    </div>
  );
}
