"use client";
import { type ChangeEvent, useEffect, useState } from "react";
import type { NodeProps } from "@xyflow/react";
import { NodeResizer } from "@xyflow/react";
import { clsx } from "clsx";

import CommonNode from "@/components/custom/node/CommonNode";

import { useNodeControl } from "@/hooks/useNodeControl";
import type { TableNode } from "@/types/flow";
import {
  ArrowsPointingOutIcon,
  DocumentIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import IconButton from "@/components/common/button/IconButton";

export default function MarkdownNode(props: NodeProps<TableNode>) {
  const { onSave } = useNodeControl();
  const [node, setNode] = useState(props);
  const [resizable, setResizable] = useState(false);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!props.selected) {
      setEditable(false);
    }
  }, [props.selected]);

  const handleSaveContext = (value: string) => {
    // if (value !== node.data.context) {
    console.log("save context", value);
    onSave(node);
    // }
    setEditable(false);
  };

  return (
    <CommonNode
      {...props}
      type="memo"
      className="w-full h-full"
      isConnectable={false}
      onDoubleClick={() => {
        setResizable(!resizable);
      }}
    >
      <>
        <NodeResizer
          handleClassName={clsx("p-1")}
          lineClassName={clsx("p-1")}
          isVisible={resizable}
          minHeight={100}
          minWidth={180}
        />


        <div className="absolute top-2 left-2">
          <DocumentIcon className="size-4 dark:text-neutral-100 text-neutral-600" />
        </div>

        <div className="w-full h-full px-2 pt-7 pb-2">
          {}
        </div>
      </>
    </CommonNode>
  );
}
