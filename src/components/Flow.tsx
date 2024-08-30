"use client";
import { useState, useCallback } from "react";
import { ReactFlow, MiniMap, Background, Controls } from "@xyflow/react";
import type { NodeTypes, NodeChange } from "@xyflow/react";

import { useFlowStore } from "@/hooks/useFlowStore";
import { useSidePanelControl } from "@/hooks/useSidePanelControl";

import MarkdownNode from "@/components/custom/node/Markdown";
import MemoNode from "@/components/custom/node/Memo";
import TableNode from "@/components/custom/node/Table";
import SidePanel from "@/components/tools/FlowToolBar";

import HelperLines from "@/components/tools/HelperLines";

import "@xyflow/react/dist/style.css";

const nodeTypes: NodeTypes = {
  markdown: MarkdownNode,
  memo: MemoNode,
  table: TableNode,
};

export default function Flow() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addNode,
    addEdge,
    helper,
  } = useFlowStore();
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
        <Controls className="text-neutral-600" />
        <MiniMap
          pannable
          zoomable
          position="bottom-left"
          className="!left-10"
        />
        <HelperLines
          horizontal={helper.horizontal}
          vertical={helper.vertical}
        />
      </ReactFlow>
    </div>
  );
}
