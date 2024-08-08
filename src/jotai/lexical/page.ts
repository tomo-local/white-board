import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { lexicalLocalAtom, initialLexical } from "@/jotai/storage/local";


export const pageAtom = atomFamily((id: string) => lexicalLocalAtom(id));

export const lexicalAtom = atomFamily((id: string) =>
  atom(
    (get) => {
      const lexical = get(pageAtom(id));

      const value = lexical.value || "";

      return JSON.stringify(value);
    },
    (get, set, update: string) => {
      const lexical = get(pageAtom(id));

      set(pageAtom(id), {
        ...lexical,
        value: update,
        update_at: new Date().toISOString(),
      });
    }
  )
);
