import clsx from "clsx";
import { useNodeEditorControl } from "@/hooks/useNodeEditorControl";

type Props = {
  id: string;
  type: string | undefined;
  label: string;
};

export default function NodeListItem(props: Props) {
  const { selectNodeId, selectedNodeId } = useNodeEditorControl();

  return (
    <div
      className={clsx(
        "border rounded-md border-slate-600 ml-1 mr-3 hover:border-2 bg-stone-200",
        selectedNodeId === props.id && "bg-stone-300"
      )}
    >
      <button
        type="button"
        className="p-1 flex flex-col items-left w-full h-full"
        onClick={() => {
          selectNodeId(props.id);
        }}
      >
        <div className="p-1">
          <div id="header">
            <div className="text-xs">TYPE: {props.type?.toUpperCase()}</div>
          </div>
          <div id="content">{props.label}</div>
        </div>
      </button>
    </div>
  );
}
