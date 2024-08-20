import { Panel } from "reactflow";
import {
  Cog6ToothIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import AddNodeMenu from "@/components/tools/AddNodeMenu";

export default function FlowToolBar() {
  return (
    <Panel
      position="top-left"
      className="bg-neutral-100 dark:bg-neutral-700 rounded-md  hover:ring-2 ring-neutral-400 dark:ring-neutral-500"
    >
      <main className="flex flex-grow  px-1 py-1 w-full text-neutral-500 dark:text-neutral-100 divide-x divide-neutral-400 dark:divide-neutral-500 space-x-2">
        <div className="flex flex-grow items-center space-x-3">
          <div className="flex-1 min-w-36 px-2">タイトル</div>
          <div>
            <button
              type="button"
              className={clsx(
                "flex items-center justify-center",
                "p-2 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-500"
              )}
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>
          </div>
          <button
            type="button"
            className={clsx(
              "flex items-center justify-center",
              "p-2 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-500"
            )}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            className={clsx(
              "flex items-center justify-center",
              "p-2 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-500"
            )}
          >
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex px-1">
          <AddNodeMenu />
        </div>
      </main>
    </Panel>
  );
}
