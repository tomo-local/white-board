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
      type="markdown"
      className="h-24 w-44 rounded-md"
      editing={selectId === node.id}
      isConnectable
      onDoubleClick={() => select(node.id)}
    >
      <>
        <div className="absolute right-1 top-1 group-hover:visible invisible divide-x divide-neutral-400">
          <IconButton
            type="button"
            className={clsx(
              "bg-neutral-200 dark:bg-neutral-700 rounded-l rounded-r-none hover:bg-neutral-300 dark:hover:bg-neutral-500",
              props.selected && "visible",
              editable && "bg-neutral-300 dark:bg-neutral-400"
            )}
            onClick={() => {
              if (editable) {
                onSave(node);
              }
              setEditable(!editable);
            }}
          >
            <PencilSquareIcon className="w-3 h-3 dark:text-neutral-100 text-neutral-600" />
          </IconButton>
          <IconButton
            type="button"
            className={clsx(
              "bg-neutral-200 dark:bg-neutral-700 rounded-r rounded-l-none hover:bg-neutral-300 dark:hover:bg-neutral-500",
              props.selected && "visible",
              selectId === node.id && "bg-neutral-300 dark:bg-neutral-400"
            )}
            onClick={() => select(node.id)}
          >
            <ArrowTopRightOnSquareIcon className="w-3 h-3 dark:text-neutral-100 text-neutral-600" />
          </IconButton>
        </div>

        <div className="flex flex-col h-full w-full">
          <div
            id={`${node.type}-header-${node.id}`}
            className="flex px-2 flex-none"
          >
            <MarkdownIcon className="size-5 mt-1 dark:fill-neutral-100 fill-neutral-500" />
          </div>
          <div
            id={`${node.type}-main-${node.id}`}
            className="flex flex-1 px-2 justify-center items-center"
          >
            <EditableText
              editable={editable}
              placeholder="入力してください"
              onClick={() => setEditable(true)}
              value={props.data.label}
              onChange={handleChangeLabel}
              onSave={handleSaveLabel}
            />
          </div>
          <div
            id={`${node.type}-footer-${node.id}`}
            className="flex px-2 flex-none h-5"
          />
        </div>
      </>
    </CommonNode>
  );
}
