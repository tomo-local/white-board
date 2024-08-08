"use client";
import { useRef } from "react";
import { type EditorState, $getRoot } from "lexical";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import {
  type InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

import clsx from "clsx";
import { useAtom } from "jotai";

import MarkdownPlugin, {
  TRANSFORMERS,
} from "@/components/common/editor/plugins/MarkdownPlugin";
import TreeViewPlugin from "@/components/common/editor/plugins/TreeViewPlugin";
import ToolbarPlugin from "@/components/common/editor/plugins/ToolBarPlugin";
import InitValuePlugin from "@/components/common/editor/plugins/InitValuePlugin";
import CodeHighlightPlugin from "@/components/common/editor/plugins/CodeHighlightPlugin";

import theme from "@/components/common/editor/theme";
import nodes from "@/components/common/editor/nodes";

import { lexicalAtom } from "@/jotai/lexical/page";

function onError(error: Error) {
  console.error(error);
}

export default function RichEditor({
  isDev,
  className,
  onChange,
  initialConfig = {
    namespace: "wbRichEditor",
    theme,
    onError,
  },
}: {
  isDev?: boolean;
  className?: string;
  onChange?: (editorState: EditorState) => void;
  initialConfig?: InitialConfigType;
}) {
  const [lexical, setLexical] = useAtom(lexicalAtom("dev"));
  const editorRef = useRef<EditorState>();

  const handleChange = (editorState: EditorState) => {
    editorRef.current = editorState;
    onChange?.(editorState);

    const value = JSON.stringify(editorState.toJSON());
    setLexical(value);
  };

  return (
    <LexicalComposer
      initialConfig={{
        ...initialConfig,
        nodes,
      }}
    >
      <div className={className}>
        <ToolbarPlugin />
        <MarkdownPlugin />
        <div
          className={clsx(
            "min-h-[45%] overflow-scroll pt-1",
            isDev ? "max-h-[45%]" : "max-h-[90%]"
          )}
        >
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="focus:outline-none focus:shadow-outline " />
            }
            placeholder={(s) => {
              console.log("placeholder",s);

              return <div className="text-gray-500">Start typing here...</div>;
            }}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <InitValuePlugin initState={lexical} />
        <HistoryPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <AutoFocusPlugin />
        <OnChangePlugin onChange={handleChange} />
        <CodeHighlightPlugin />
        {isDev && <TreeViewPlugin />}
      </div>
    </LexicalComposer>
  );
}
