"use client";
import { type ChangeEvent, useEffect, useState } from "react";
import type { NodeProps } from "@xyflow/react";
import { NodeResizer, useUpdateNodeInternals } from "@xyflow/react";
import { clsx } from "clsx";

import CommonNode from "@/components/custom/node/CommonNode";

import { useNodeControl } from "@/hooks/useNodeControl";
import type { MemoNode } from "@/types/flow";
import { useNodeDetailsControl } from "@/hooks/useNodeDetailsControl";

export default function MarkdownNode(props: NodeProps<MemoNode>) {
  return (
    <CommonNode
      {...props}
      type="memo"
      className="w-full h-full"
      isConnectable={false}
    >
      <NodeResizer isVisible={props.selected} minHeight={100} minWidth={180} />
      <textarea className="text-neutral-700 dark:text-neutral-300 bg-inherit w-full h-full">
        {props.data.context}
      </textarea>
    </CommonNode>
  );
}
