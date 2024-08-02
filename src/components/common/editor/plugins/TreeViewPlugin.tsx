import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";

import clsx from "clsx";

const commonButtonClassName =
  "border rounded-md bg-slate-100 text-slate-950 py-1 px-2 m-1";
const timeTravelPanelSliderClassName = "w-full justify-center items-center";

export default function TreeViewPlugin() {
  const [editor] = useLexicalComposerContext();
  return (
    <TreeView
      viewClassName="bg-slate-600 text-slate-100 rounded-md text-xs p-2 w-full min-h-52 relative"
      treeTypeButtonClassName={clsx(commonButtonClassName, "right-1 absolute")}
      timeTravelPanelClassName="bg-slate-600 flex items-center justify-center"
      timeTravelButtonClassName={clsx(
        commonButtonClassName,
        "right-1 bottom-1 absolute"
      )}
      timeTravelPanelSliderClassName={clsx(timeTravelPanelSliderClassName)}
      timeTravelPanelButtonClassName={clsx(commonButtonClassName)}
      editor={editor}
    />
  );
}
