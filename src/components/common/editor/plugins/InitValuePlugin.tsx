import { useState } from "react";
import type { EditorState } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export default function InitValuePlugin({
  initState,
}: {
  initState: EditorState | string;
}) {
  const [loading, setLoading] = useState(true);
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!loading || !editor) {
      return;
    }

    const init =
      typeof initState === "string"
        ? editor?.parseEditorState(JSON.parse(initState))
        : initState;

    if (init.isEmpty()) {
      return;
    }

    editor.setEditorState(init);

    setLoading(false);
  }, [editor, initState, loading]);

  return null;
}
