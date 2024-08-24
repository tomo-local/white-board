import type { Connection, XYPosition } from "@xyflow/react";
import { Position } from "@xyflow/react";
import type {
  CustomNodes,
  MarkdownNode,
  MemoNode,
  TableNode,
  CustomNodeTypes,
} from "@/types/flow";

import { v4 as uuid } from "uuid";

type InputNode = {
  type: CustomNodeTypes;
  position: XYPosition;
  data?: Record<string, unknown>;
  nodes?: CustomNodes[];
};

const defaultMemoSize = 180;

const Node = ({
  type,
  position,
  data,
}: Pick<InputNode, "type" | "position" | "data">) => {
  const common = {
    id: uuid(),
    type,
    dragHandle: ".custom-drag-handle",
    position,
    data: {
      ...data,
    },
  };

  switch (type) {
    case "markdown":
      return { ...common } as MarkdownNode;

    case "memo":
      return { ...common } as MemoNode;

    case "table":
      return { ...common } as TableNode;

    default:
      return { ...common } as MarkdownNode;
  }
};

const crateLabel = (type: CustomNodeTypes, nodes?: CustomNodes[]) =>
  `カード ${nodes?.filter((node) => node.type === type).length}`;

export const createNode = ({ type, position, data, nodes }: InputNode) => {
  const date = {
    created_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
  };

  switch (type) {
    case "markdown":
      return Node({
        type,
        position,
        data: {
          label: crateLabel(type, nodes),
          context: "# Markdown",
          ...date,
          ...data,
        },
      }) as MarkdownNode;
    case "memo":
      return {
        ...Node({
          type,
          position,
          data: {
            context: null,
            ...date,
            ...data,
          },
        }),
        width: defaultMemoSize,
        height: defaultMemoSize,
      } as MemoNode;

    case "table":
      return Node({
        type,
        position,
        data: {
          rowColumns: ["row1", "row2"],
          lineColumns: ["line1", "line2"],
          table: [
            { row1: "line1", row2: "line2" },
            { row1: "line1", row2: "line2" },
          ],
          ...date,
          ...data,
        },
      }) as TableNode;

    default:
      return {
        ...Node({ type, position }),
        data: {
          label: crateLabel(type, nodes),
          context: "# Markdown",
          ...data,
        },
      } as MarkdownNode;
  }
};

export const updateNodeData = (
  node: CustomNodes,
  data: Record<string, unknown>
): CustomNodes => {
  switch (node?.type) {
    case "markdown":
      return Node({
        ...node,
        data: {
          ...node.data,
          ...data,
          update_at: new Date().toISOString(),
        },
      }) as MarkdownNode;
    case "memo":
      return Node({
        ...node,
        data: {
          ...node.data,
          ...data,
          update_at: new Date().toISOString(),
        },
      }) as MemoNode;
    case "table":
      return Node({
        ...node,
        data: {
          ...node.data,
          ...data,
          update_at: new Date().toISOString(),
        },
      }) as TableNode;
    default:
      return node;
  }
};

export const buildConnection = (
  type: Position,
  currentNodeId: string,
  nextNodeId: string
): Connection => {
  switch (type) {
    case Position.Top:
      return {
        source: currentNodeId,
        sourceHandle: Position.Top,
        target: nextNodeId,
        targetHandle: Position.Bottom,
      };
    case Position.Right:
      return {
        source: currentNodeId,
        sourceHandle: Position.Right,
        target: nextNodeId,
        targetHandle: Position.Left,
      };

    case Position.Left:
      return {
        source: nextNodeId,
        sourceHandle: Position.Right,
        target: currentNodeId,
        targetHandle: Position.Left,
      };
    case Position.Bottom:
      return {
        source: nextNodeId,
        sourceHandle: Position.Top,
        target: currentNodeId,
        targetHandle: Position.Bottom,
      };
  }
};
