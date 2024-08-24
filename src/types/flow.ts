import type { Node, Edge } from "@xyflow/react";

export type CustomNodes = MarkdownNode | MemoNode | TableNode;

export type CustomEdges = Edge;

export type CustomNodeTypes =
  | MarkdownNode["type"]
  | MemoNode["type"]
  | TableNode["type"];

export interface MarkdownNode extends Node {
  type: "markdown";
  data: {
    label: string;
    context: string | null;
    created_at: string;
    update_at: string;
  };
}

export interface MemoNode extends Node {
  type: "memo";
  data: {
    context: string | null;
    created_at: string;
    update_at: string;
  };
}

export interface TableNode extends Node {
  type: "table";
  data: {
    rowColumns: string[];
    lineColumns: string[];
    table: object[];
    created_at: string;
    update_at: string;
  };
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
