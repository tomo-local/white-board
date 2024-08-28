import type { Connection, XYPosition } from "@xyflow/react";
import { Position } from "@xyflow/react";
import type {
  CustomNodes,
  MarkdownNode,
  MemoNode,
  TableNode,
  CustomNodeType,
} from "@/types/flow";

import { v4 as uuid } from "uuid";

type InputNode = {
  id?: string;
  type: CustomNodeType;
  position: XYPosition;
  data?: Record<string, unknown>;
  nodes?: CustomNodes[];
};

const defaultMemoSize = 180;

const Node = ({
  id = uuid(),
  type,
  position,
  data,
}: Pick<InputNode, "id" | "type" | "position" | "data">) => {
  const common = {
    id,
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

const crateLabel = (type: CustomNodeType, nodes?: CustomNodes[]) =>
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
          label: crateLabel(type, nodes),
          columns: [
            {
              id: "name",
              label: "名前",
              type: "string",
            },
            {
              id: "column_1",
              label: "値",
              type: "string",
            },
          ],
          values: [
            { name: "ID", column_1: "00001" },
            { name: "名前", column_1: "山田太郎" },
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

type calNodeCenterPositionProps = (
  x: number,
  y: number,
  width: number | undefined,
  height: number | undefined
) => XYPosition;
export const calNodeCenterPosition: calNodeCenterPositionProps = (
  x,
  y,
  width,
  height
) => {
  const newX = !width ? x : x + width / 2;
  const newY = !height ? y : y + height / 2;

  return {
    x: newX,
    y: newY,
  };
};

type calNextNodePositionProps = (
  type: Position,
  position: XYPosition,
  size?: {
    width: number | undefined;
    height: number | undefined;
  }
) => XYPosition;

export const calNextNodePosition: calNextNodePositionProps = (
  type,
  position,
  size
) => {
  const { x, y } = position;
  const { width = 300, height = 200 } = size || {};

  const plusX = width + 150;
  const plusY = height + 100;

  switch (type) {
    case Position.Top:
      return { x: x, y: y - plusY };
    case Position.Right:
      return { x: x + plusX, y: y };
    case Position.Left:
      return { x: x - plusX, y: y };
    case Position.Bottom:
      return { x: x, y: y + plusY };
    default:
      return { x: x, y: y };
  }
};
