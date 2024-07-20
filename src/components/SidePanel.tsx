import { useSidePanelControl } from "@/hooks/useSidePanelControl";
import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type Position = "left" | "right";

type PanelProps = {
  position?: Position;
};
export default function SidePanel({ position = "left" }: PanelProps) {
  const { select, selected, reset } = useSidePanelControl();

  return (
    <div className={`react-flow__panel ${position} top-1/3`}>
      <div className="flex flex-col bg-slate-500 rounded-sm w-10 ">
        <button
          type="button"
          className={clsx(
            "h-10 w-10 flex justify-center items-center",
            "border border-stone-300",
            "hover:bg-slate-400 hover:border-stone-400 group",
            selected === "markdown" && "bg-slate-400 border-stone-400"
          )}
          onClick={() => {
            selected === "markdown" ? reset() : select("markdown");
          }}
        >
          <PlusIcon className="h-6 w-6" />
          <span
            className={clsx(
              "absolute top-2 left-12 py-1 px-2 w-auto",
              "border text-xs invisible rounded text-white bg-slate-500 opacity-100",
              "group-hover:visible"
            )}
          >
            Markdown
          </span>
        </button>
      </div>
    </div>
  );
}
