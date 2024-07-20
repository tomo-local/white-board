import type { ChangeEvent } from "react";
import clsx from "clsx";
import {
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

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
    selectNodeId,
  } = useNodeEditorControl();

  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...nodeData, label: e.target.value });
  };

  const handleChangeContext = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ ...nodeData, context: e.target.value });
  };

  return (
    node && (
      <div className="h-screen bg-stone-200 z-40 w-1/2 min-w-96 text-stone-600 flex flex-col border-l border-stone-300 transition-all">
        <div className="flex flex-none p-2 w-full justify-between ">
          <div className="flex h-full space-x-1">
            <button
              type="button"
              className="hover:bg-stone-300 rounded-md p-1"
              onClick={resetNodeId}
            >
              <ChevronDoubleRightIcon className="w-4 h-4" />
            </button>
            <div className="border-l border-stone-400 my-1.5" />
            <button
              type="button"
              className={clsx(
                "hover:bg-stone-300 rounded-md p-1",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              disabled={!before}
              onClick={() => before && selectNodeId(before?.id)}
            >
              <ChevronUpIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              className={clsx(
                "hover:bg-stone-300 rounded-md p-1",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              disabled={!after}
              onClick={() => after && selectNodeId(after?.id)}
            >
              <ChevronDownIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="flex h-full space-x-1">
            <button
              type="button"
              className="hover:bg-stone-300 rounded-md p-1"
              onClick={() => {
                onDelete();
                resetNodeId();
              }}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
            <button type="button" className="hover:bg-stone-300 rounded-md p-1">
              <EllipsisHorizontalIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grow flex flex-col px-4 py-1">
          <div className="flex flex-col flex-none h-44">
            <div className="text-3xl">
              <input
                type="text"
                className="w-full rounded-md bg-stone-200 focus:outline-none focus:shadow-outline px-2 py-1 hover:bg-stone-300"
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
              <div className="flex space-x-3 hover:bg-stone-300 px-2 py-1 rounded-md">
                <div className="flex-none w-20">作成日</div>
                <div className="flex-2">{nodeData?.created_at}</div>
              </div>
              <div className="flex space-x-3 hover:bg-stone-300 px-2 py-1 rounded-md">
                <div className="flex-none w-20">更新日</div>
                <div className="flex-2">{nodeData?.update_at}</div>
              </div>
            </div>
          </div>
          <div className="grow border-2">
            <textarea
              className="w-full h-full rounded-md bg-stone-200 focus:outline-none focus:shadow-outline p-2 hover:bg-stone-300"
              value={nodeData?.context}
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
