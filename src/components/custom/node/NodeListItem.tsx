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
        "border-2 rounded-md dark:border-neutral-600 ml-1 mr-3 dark:bg-neutral-700",
        "hover:border-2 dark:hover:border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800",
        selectedNodeId === props.id &&
          "dark:bg-neutral-600 dark:border-neutral-400 bg-neutral-200 border-neutral-400"
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
