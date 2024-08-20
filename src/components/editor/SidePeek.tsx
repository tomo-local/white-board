import type { ChangeEvent } from "react";
import clsx from "clsx";
import {
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import IconButton from "@/components/common/button/IconButton";
import { useNodeEditorControl } from "@/hooks/useNodeEditorControl";

export default function SidePeek() {
  const {
    node,
    before,
    after,
    nodeData,
    resetNodeId,
    onChange,
    onDelete,
    onSave,
    select,
  } = useNodeEditorControl();

  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    if (!nodeData) {
      return;
    }
    onChange({ ...nodeData, label: e.target.value });
  };

  const handleChangeContext = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!nodeData) {
      return;
    }
    onChange({ ...nodeData, context: e.target.value });
  };

  const handleDelete = () => {
    onDelete();
    resetNodeId();
  };

  return (
    node && (
      <div
        id="side-peek"
        className={clsx(
          "bg-neutral-200 dark:bg-neutral-700",
          "flex flex-col h-full w-1/2",
          "border-l-2 border-neutral-300 dark:border-neutral-500"
        )}
      >
        <div className="flex p-2 flex-none w-full justify-between">
          <div className="flex h-full space-x-1">
            <IconButton
              type="button"
              onClick={resetNodeId}
              chip="閉じる"
              className="hover:bg-neutral-300 dark:hover:bg-slate-500"
            >
              <ChevronDoubleRightIcon className="w-4 h-4" />
            </IconButton>
            <div className="border-l border-stone-400 my-1.5" />
            <IconButton
              type="button"
              className="disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-300 dark:hover:bg-slate-500"
              disabled={!before}
              onClick={() => before && select(before?.id)}
            >
              <ChevronUpIcon className="w-4 h-4" />
            </IconButton>
            <IconButton
              type="button"
              className="disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-300 dark:hover:bg-slate-500"
              disabled={!after}
              onClick={() => after && select(after?.id)}
            >
              <ChevronDownIcon className="w-4 h-4" />
            </IconButton>
          </div>
          <div className="flex h-full space-x-1">
            <IconButton
              type="button"
              onClick={handleDelete}
              className="hover:bg-neutral-300 dark:hover:bg-slate-500"
            >
              <TrashIcon className="w-4 h-4" />
            </IconButton>
            <IconButton type="button">
              <EllipsisHorizontalIcon className="w-4 h-4" />
            </IconButton>
          </div>
        </div>

        <div className="flex flex-col px-4 py-1">
          <div className="flex flex-col flex-none h-44">
            <div className="text-3xl">
              <input
                type="text"
                className={clsx(
                  "w-full rounded-md bg-stone-200 focus:outline-none focus:shadow-outline px-2 py-1 hover:bg-neutral-300",
                  "dark:bg-neutral-700 dark:hover:bg-neutral-600"
                )}
                value={nodeData?.label}
                onChange={handleChangeLabel}
                onBlur={onSave}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    onSave();
                    e.currentTarget.blur();
                  }
                }}
              />
            </div>
            <div className="px-2 py-1 flex flex-col text-sm space-y-1">
              <div
                className={clsx(
                  "flex space-x-3 hover:bg-stone-300 px-2 py-1 rounded-md",
                  "dark:bg-neutral-700 dark:hover:bg-neutral-600"
                )}
              >
                <div className="flex-none w-20">作成日</div>
                <div className="flex-2">{nodeData?.created_at}</div>
              </div>
              <div
                className={clsx(
                  "flex space-x-3 hover:bg-stone-300 px-2 py-1 rounded-md",
                  "dark:bg-neutral-700 dark:hover:bg-neutral-600"
                )}
              >
                <div className="flex-none w-20">更新日</div>
                <div className="flex-2">{nodeData?.update_at}</div>
              </div>
            </div>
          </div>
          <div className="grow">
            <textarea
              className={clsx(
                "w-full h-full rounded-md bg-stone-200 focus:outline-none focus:shadow-outline p-2 hover:bg-stone-300",
                "dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
              )}
              value={nodeData?.context || ""}
              onChange={handleChangeContext}
              onBlur={onSave}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  onSave();
                  e.currentTarget.blur();
                }
              }}
            />
          </div>
        </div>
      </div>
    )
  );
}
