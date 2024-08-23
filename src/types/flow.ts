import type { Node, Edge } from "@xyflow/react";

export type CustomNodes = MarkdownNode | MemoNode;

export type CustomEdges = Edge;

export type CustomNodeTypes = "markdown" | "memo";

export interface MarkdownNode extends Node {
  data: {
    label: string;
    context: string | null;
    created_at: string;
    update_at: string;
  };
  type: "markdown";
}

export interface MemoNode extends Node {
  data: {
    context: string | null;
    created_at: string;
    update_at: string;
  };
  type: "memo";
}

export type PageListItem = {
  id: string;
  title: string;
  created_at: string;
  update_at: string;
};

export type Page = {
  id: string;
  title: string;
  created_at: string;
  update_at: string;
  nodes: CustomNodes[];
  edges: Edge[];
};

export type FlowParams = {
  id: string;
};
