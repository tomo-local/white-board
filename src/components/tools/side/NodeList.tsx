import { useFlowStore } from "@/hooks/useFlowStore";
import clsx from "clsx";

import NodeItem from "@/components/tools/side/NodeItem";

export default function NodeList() {
  const { nodes } = useFlowStore();
  return (
    <div
      className={clsx(
        "text-neutral-600 dark:text-neutral-200 flex flex-col border-l border-neutral-300",
        "bg-neutral-100 dark:bg-neutral-800",
        "dark:border-neutral-500 max-h-[calc(100vh-5rem)] overflow-y-scroll"
      )}
    >
      <div className="relative py-2  scroll-smooth h-full">
        <div className="relative space-y-2 w-full full">
          {nodes?.map((node) => (
            <NodeItem node={node} key={node.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
