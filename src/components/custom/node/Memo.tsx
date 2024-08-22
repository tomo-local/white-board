"use client";
import { type ChangeEvent, useEffect, useState } from "react";
import type { NodeProps } from "@xyflow/react";
import { clsx } from "clsx";

import {
  ArrowTopRightOnSquareIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import CommonNode from "@/components/custom/node/CommonNode";
import IconButton from "@/components/common/button/IconButton";
import EditableText from "@/components/common/input/EditableText";
import MarkdownIcon from "@/components/common/icons/MarkdownIcon";

import { useNodeControl } from "@/hooks/useNodeControl";
import type { MarkdownNode as Node } from "@/types/flow";
import { useNodeDetailsControl } from "@/hooks/useNodeDetailsControl";

export default function MarkdownNode(props: NodeProps<Node>) {
  const { onSave } = useNodeControl();
  const { select, selectId } = useNodeDetailsControl();
  const [node, setNode] = useState(props);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!props.selected) {
      setEditable(false);
    }
  }, [props.selected]);

  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setNode({
      ...node,
      data: {
        ...node.data,
        label: e.target.value,
      },
    });
  };

  const handleSaveLabel = () => {
    onSave(node);
    setEditable(false);
  };

  return (
    <CommonNode
      {...props}
      type="memo"
      className="h-24 w-44 rounded-md"
      editing={selectId === node.id}
      isConnectable
      onDoubleClick={() => select(node.id)}
    >
      test
    </CommonNode>
  );
}
