import type { Edge, Node } from "reactflow";
import { atomWithStorage } from "jotai/utils";
import { v4 as uuid } from "uuid";

export type Page = {
  id: string;
  title: string;
  created_at: string;
  update_at: string;
  nodes: Node[];
  edges: Edge[];
};

export type Lexical = {
  value: object | string;
  created_at?: string;
  update_at?: string;
};

export const initialNodes: Node[] = [
  {
    id: uuid(),
    type: "markdown",
    dragHandle: ".custom-drag-handle",
    data: {
      label: "Node 0",
      context: "Sample",
      created_at: new Date().toISOString(),
      update_at: new Date().toISOString(),
    },
    position: { x: 100, y: 100 },
  },
];

export const initialEdges: Edge[] = [];

//MEMO： 廃止予定
export const pagesAtom = atomWithStorage("wb-pages", [] as Page[], undefined, {
  getOnInit: true,
});

export const pageLocalAtom = (id: string) =>
  atomWithStorage(
    `wb-page-${id}`,
    {
      id: id,
      title: "New Page",
      created_at: new Date().toISOString(),
      update_at: new Date().toISOString(),
      nodes: initialNodes,
      edges: initialEdges,
    } as Page,
    undefined,
    {
      getOnInit: true,
    }
  );

export const initialLexical = {
  root: {
    children: [
      {
        children: [],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: null,
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

export const lexicalLocalAtom = (id: string) =>
  atomWithStorage(
    `wb-lexical-${id}`,
    {
      // value: JSON.stringify(initialLexical),
      value: "",
      created_at: new Date().toISOString(),
      update_at: new Date().toISOString(),
    } as Lexical,
    undefined,
    {
      getOnInit: true,
    }
  );
