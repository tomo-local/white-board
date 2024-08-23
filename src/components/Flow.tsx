"use client";
import { ReactFlow, MiniMap, Background } from "@xyflow/react";
import type { NodeTypes } from "@xyflow/react";

import { useFlowStore } from "@/hooks/useFlowStore";
import { useSidePanelControl } from "@/hooks/useSidePanelControl";

import MarkdownNode from "@/components/custom/node/Markdown";
import MemoNode from "@/components/custom/node/Memo";
import SidePanel from "@/components/tools/FlowToolBar";

import "@xyflow/react/dist/style.css";

const nodeTypes: NodeTypes = {
  markdown: MarkdownNode,
  memo: MemoNode,
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
        fitView
      >
        <Background />
        <SidePanel />
        <MiniMap pannable zoomable position="bottom-left" />
      </ReactFlow>
    </div>
  );
}
