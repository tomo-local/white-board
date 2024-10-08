"use client";
import { type ChangeEvent, use, useEffect, useState } from "react";
import type { NodeProps } from "@xyflow/react";
import { NodeResizer } from "@xyflow/react";
import {
  ArrowsPointingOutIcon,
  DocumentIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import CommonNode from "@/components/custom/node/CommonNode";
import IconButton from "@/components/common/button/IconButton";

import { useNodeControl } from "@/hooks/useNodeControl";
import type { MemoNode } from "@/types/flow";

export default function MarkdownNode(props: NodeProps<MemoNode>) {
  const { onSave } = useNodeControl();
  const [node, setNode] = useState(props);
  const [resizable, setResizable] = useState(false);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!props.selected) {
      setEditable(false);
    }
  }, [props.selected]);

  const handleChangeContext = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNode({
      ...props,
      data: {
        ...node.data,
        context: e.currentTarget.value,
      },
    });
  };

  const handleSaveContext = (value: string | null) => {
    if (value !== node.data.context) {
      onSave({
        ...node,
        data: {
          ...node.data,
          context: value,
        },
      });
    }
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
          onResize={(_, params) => {
            setNode({
              ...props,
              width: params.width,
              height: params.height,
            });
          }}
          minHeight={100}
          minWidth={180}
        />

        <div
          id="node-memo-tool"
          className="absolute right-1 top-1 group-hover:visible invisible divide-x divide-neutral-400"
        >
          <IconButton
            type="button"
            onClick={() => {
              setEditable(!editable);
              if (editable) {
                handleSaveContext(node.data.context);
              }
            }}
            className={clsx(
              "bg-neutral-200 dark:bg-neutral-700 rounded-l rounded-r-none hover:bg-neutral-300 dark:hover:bg-neutral-500",
              props.selected && "visible",
              resizable && "visible",
              editable && "visible bg-neutral-300 dark:bg-neutral-400"
            )}
          >
            <PencilSquareIcon className="size-3" />
          </IconButton>
          <IconButton
            type="button"
            onClick={() => setResizable(!resizable)}
            className={clsx(
              "bg-neutral-200 dark:bg-neutral-700 rounded-l-none rounded-r hover:bg-neutral-300 dark:hover:bg-neutral-500",
              props.selected && "visible",
              editable && "visible",
              resizable && "visible bg-neutral-300 dark:bg-neutral-400"
            )}
          >
            <ArrowsPointingOutIcon className="size-3" />
          </IconButton>
        </div>

        <div className="absolute top-2 left-2">
          <DocumentIcon className="size-4 dark:text-neutral-100 text-neutral-600" />
        </div>

        <div className="w-full h-full px-2 pt-7 pb-2">
          {editable ? (
            <textarea
              disabled={!editable}
              defaultValue={node?.data?.context || undefined}
              onChange={handleChangeContext}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  handleSaveContext(e.currentTarget.value);
                  e.currentTarget.blur();
                }
              }}
              onBlur={
                editable && ((e) => handleSaveContext(e.currentTarget.value))
              }
              className={clsx(
                "w-full h-full text-neutral-700 dark:text-neutral-300 bg-inherit break-words resize-none outline-none",
                "bg-neutral-200 dark:bg-neutral-700 py-1 px-2 rounded-md",
                "focus:ring-2 ring-neutral-500 dark:ring-neutral-400"
              )}
            />
          ) : (
            <div className="px-2 w-full h-full text-neutral-700 dark:text-neutral-300 break-words whitespace-pre-wrap overflow-hidden">
              {node.data.context}
            </div>
          )}
        </div>
      </>
    </CommonNode>
  );
}
