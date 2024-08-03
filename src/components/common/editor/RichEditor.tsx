import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import TreeViewPlugin from "@/components/common/editor/plugins/TreeViewPlugin";
import ToolbarPlugin from "@/components/common/editor/plugins/ToolBarPlugin";

import theme from "@/components/common/editor/theme";
import clsx from "clsx";

function onError(error: Error) {
  console.error(error);
}

export default function RichEditor({
  isDev,
  className,
}: {
  isDev?: boolean;
  className?: string;
}) {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={className}>
        <ToolbarPlugin />
        <div
          className={clsx(
            "min-h-[45%] overflow-scroll pt-1",
            isDev ? "max-h-[45%]" : "max-h-[90%]"
          )}
        >
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="focus:outline-none focus:shadow-outline" />
            }
            placeholder={<div>Enter some text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <AutoFocusPlugin />
        {isDev && <TreeViewPlugin />}
      </div>
    </LexicalComposer>
  );
}
