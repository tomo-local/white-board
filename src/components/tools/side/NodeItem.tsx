import clsx from "clsx";
import type { CustomNodes } from "@/types/flow";

type NodeItemProps = {
  key: string;
  node: CustomNodes;
};

export default function NodeListItem({ key, node }: NodeItemProps) {
  return (
    <div
      key={key}
      className={clsx(
        "border-2 rounded-md dark:border-neutral-600 mx-3 dark:bg-neutral-700",
        "hover:border-2 dark:hover:border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600"
      )}
    >
      <button
        type="button"
        className="p-1 flex flex-col items-left w-full h-full"
      >
        <div className="p-1">
          <div id="header">
            <div className="text-xs">TYPE: {node.type?.toUpperCase()}</div>
          </div>
          <div id="content">
            {node.type === "markdown" ? node.data.label : ""}
          </div>
        </div>
      </button>
    </div>
  );
}
