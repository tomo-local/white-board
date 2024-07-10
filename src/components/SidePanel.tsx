import { useSidePanelControl } from "@/hooks/useSidePanelControl";

type Position = "left" | "right";

type PanelProps = {
  position?: Position;
};
export default function SidePanel({ position = "left" }: PanelProps) {
  const { selected, select } = useSidePanelControl();

  return (
    <div className={`react-flow__panel ${position} bottom-1/3 top-1/3`}>
      <div className="flex flex-col bg-slate-500 rounded-sm w-10">
        <button
          type="button"
          className="h-10 rounded-t-sm border border-slate-60 w-full relative group hover:bg-slate-400"
          onClick={() => {
            select("add-normal-node");
          }}
        >
          ＋
          <span className="border text-xs w-auto invisible rounded text-white bg-slate-500 py-1 px-2 top-2 left-12 group-hover:visible opacity-100 absolute">
            Markdown
          </span>
        </button>
      </div>
    </div>
  );
}
