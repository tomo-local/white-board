import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeNode, CodeHighlightNode } from "@lexical/code";

import type { Klass, LexicalNode } from "lexical";

const nodes: Klass<LexicalNode>[] = [
  HeadingNode,
  CodeNode,
  CodeHighlightNode,
  QuoteNode,
];

export default nodes;
