import type { Node, Edge } from "@xyflow/react";

/**
 * Node Types
 */
export type CustomNodes = MarkdownNode | MemoNode | TableNode;
export type CustomNodeType = CustomNodes["type"];
export type CustomNode<Type> = Type extends MarkdownNode["type"]
  ? MarkdownNode
  : Type extends MemoNode["type"]
  ? MemoNode
  : Type extends TableNode["type"]
  ? TableNode
  : never;

type CommonDataKey = "label" | "created_at" | "update_at";

export type NodeData<T> = Record<CommonDataKey, string> & T;

export interface MarkdownNode extends Node {
  type: "markdown";
  data: NodeData<{
    context: string | null;
  }>;
}

export interface MemoNode extends Node {
  type: "memo";
  data: NodeData<{
    context: string | null;
  }>;
}

export interface TableNode extends Node {
  type: "table";
  data: NodeData<{
    columns: CellType[];
    values: CellValue[][];
  }>;
}

export type CellType = {
  id: string;
  label: string;
  type: "string" | "number" | "boolean" | "date";
};

export type CellValue = {
  value: string;
};

/*
 * Edge Types
 */

export type CustomEdges = Edge;

/**
 * Page List
 */
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
