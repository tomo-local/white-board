import { useCallback, useEffect, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";

import clsx from "clsx";

import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  BoldIcon,
  CodeBracketIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "@heroicons/react/24/outline";

const LowPriority = 1;

function Button({
  onClick,
  disabled = false,
  className,
  ariaLabel,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  className: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center justify-items-center">
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={clsx(
          "p-2 rounded-md",
          disabled || "hover:bg-gray-200",
          className
        )}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    </div>
  );
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <div
      className="grid grid-flow-col auto-cols-max space-x-1 h-10 bg-white rounded-md px-1 border"
      ref={toolbarRef}
    >
      <Button
        disabled={!canUndo}
        className=""
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        ariaLabel="Undo"
      >
        <ArrowUturnLeftIcon className="h-4 w-4" />
      </Button>
      <Button
        disabled={!canRedo}
        className=""
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        ariaLabel="Redo"
      >
        <ArrowUturnRightIcon className="h-4 w-4" />
      </Button>
      <Button
        className={isBold ? "bg-slate-300" : ""}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        ariaLabel="Format Bold"
      >
        <BoldIcon className="h-4 w-4" />
      </Button>
      <Button
        className={isItalic ? "bg-slate-300" : ""}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        ariaLabel="Format Italics"
      >
        <ItalicIcon className="h-4 w-4" />
      </Button>
      <Button
        className={isUnderline ? "bg-slate-300" : ""}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        ariaLabel="Format Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        className={isCode ? "bg-slate-300" : ""}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        }}
        ariaLabel="Format Code"
      >
        <CodeBracketIcon className="h-4 w-4" />
      </Button>
      <Button
        className={isStrikethrough ? "bg-slate-300" : ""}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        ariaLabel="Format Strikethrough"
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
