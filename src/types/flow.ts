import type { Node, Edge } from "@xyflow/react";

export type CustomNodes = MarkdownNode | DocumentNode;

export type CustomEdges = Edge;

export type CustomNodeTypes = "markdown" | "document";

export interface MarkdownNode extends Node {
  data: {
    label: string;
    context: string | null;
    created_at: string;
    update_at: string;
  };
  type: "markdown";
}

export interface DocumentNode extends Node {
  data: {
    context: string | null;
    created_at: string;
    update_at: string;
  };
  type: "document";
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
