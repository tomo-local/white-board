import { $getRoot, $createTextNode } from "lexical";
import {
  type Transformer,
  TEXT_FORMAT_TRANSFORMERS,
  CODE,
  QUOTE,
  INLINE_CODE
} from "@lexical/markdown";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
} from "@lexical/markdown";
import { $createCodeNode, $isCodeNode } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const TRANSFORMERS: Transformer[] = [
  // ...ELEMENT_TRANSFORMERS,
  CODE,
  QUOTE,
  INLINE_CODE,
  ...TEXT_FORMAT_TRANSFORMERS,
];

export default function MarkdownPlugin() {
  const [editor] = useLexicalComposerContext();

  const handleMarkdown = () => {
    editor.update(() => {
      const root = $getRoot();
      const firstChild = root.getFirstChild();

      console.log(root, firstChild);

      if ($isCodeNode(firstChild) && firstChild.getLanguage() === "markdown") {
        $convertFromMarkdownString(firstChild.getTextContent(), TRANSFORMERS);
      } else {
        const markdown = $convertToMarkdownString(TRANSFORMERS);
        root
          .clear()
          .append(
            $createCodeNode("markdown").append($createTextNode(markdown))
          );
      }
      root.selectEnd();
    });
  };

  return (
    <div className="">
      <label className="inline-flex items-center cursor-pointer">
        <button type="button" role={"switch"} onClick={handleMarkdown}>
          Markdown
        </button>
      </label>
    </div>
  );
}
