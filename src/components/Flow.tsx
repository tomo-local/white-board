"use client";
import ReactFlow, { MiniMap, Background } from "reactflow";

import { useFlowStore } from "@/hooks/useFlowStore";
import { useSidePanelControl } from "@/hooks/useSidePanelControl";

import MarkdownNode from "@/components/custom/node/Markdown";
import SidePanel from "@/components/tools/FlowToolBar";

import "reactflow/dist/style.css";

const nodeTypes = {
  markdown: MarkdownNode,
};

export default function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, addNode, addEdge } =
    useFlowStore();

  const { onPanelClick, selected } = useSidePanelControl(addNode);

  return (
    <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800">
      <ReactFlow
        className={selected ? "custom-cursor-pointer" : ""}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onPaneClick={onPanelClick}
        onConnect={addEdge}
      >
        <Background />
        <MiniMap className="bg-neutral-200 dark:bg-neutral-800" />
        <SidePanel />
      </ReactFlow>
    </div>
  );
}
