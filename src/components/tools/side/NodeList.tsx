import { useFlowStore } from "@/hooks/useFlowStore";
import clsx from "clsx";

import MarkdownItem from "@/components/tools/side/MarkdownItem";
import MemoItem from "@/components/tools/side/MemoItem";
import TableItem from "@/components/tools/side/TableItem";

export default function NodeList() {
  const { nodes } = useFlowStore();

  return (
    <div
      className={clsx(
        "text-neutral-500 dark:text-neutral-200 flex flex-col border-l border-neutral-300",
        "bg-neutral-100 dark:bg-neutral-800",
        "dark:border-neutral-500 max-h-[calc(100vh-5rem)] overflow-y-scroll"
      )}
    >
      <div className="relative py-2  scroll-smooth h-full">
        <div className="relative space-y-2 w-full full">
          {nodes?.map((node) => (
            <div key={node.id}>
              {node.type === "markdown" && <MarkdownItem node={node} />}
              {node.type === "memo" && <MemoItem node={node} />}
              {node.type === "table" && <TableItem node={node} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
