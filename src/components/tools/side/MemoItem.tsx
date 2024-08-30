import clsx from "clsx";
import type { MemoNode } from "@/types/flow";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { useFlowStore } from "@/hooks/useFlowStore";

type NodeItemProps = {
  node: MemoNode;
};

export default function MemoItem({ node }: NodeItemProps) {
  const { moveNodeCenterPosition } = useFlowStore();
  return (
    <div
      key={node.id}
      className={clsx(
        "border-2 rounded-md dark:border-neutral-600 mx-3 dark:bg-neutral-700",
        "hover:border-2 dark:hover:border-neutral-400",
        "cursor-pointer",
        "min-h-20"
      )}
      onDoubleClick={() => moveNodeCenterPosition(node)}
    >
      <div className="p-1 flex flex-col items-left">
        <div id="header" className="flex">
          <div className="text-xs flex-1 relative p-1">
            <DocumentIcon className="size-4 dark:fill-neutral-100 fill-neutral-500" />
          </div>
        </div>
        <div id="content" className="truncate overflow-hidden">
          {node.data.context}
        </div>
      </div>
    </div>
  );
}
