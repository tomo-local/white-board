import type { EditorThemeClasses } from "lexical";

export default {
  code: "relative bg-gray-200 p-2 pl-4 border-l-[50px] border-gray-300",
  codeHighlight: {},
  heading: {
    h1: "text-4xl",
    h2: "text-3xl",
    h3: "text-2xl",
    h4: "text-xl",
    h5: "text-lg",
  },
  list: {
    listitem: "editor-listitem",
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
  },
  ltr: "ltr",
  rtl: "rtl",
  paragraph: "editor-paragraph",
  placeholder: "editor-placeholder",
  quote: "y-2 border-l-4 border-gray-300 pl-2",
  text: {
    bold: "font-bold",
    code: "bg-gray-200 py-1 px-2",
    hashtag: "editor-text-hashtag",
    italic: "italic",
    overflowed: "editor-text-overflowed",
    strikethrough: "line-through",
    underline: "underline",
    underlineStrikethrough: "underline line-through",
  },
} as EditorThemeClasses;
