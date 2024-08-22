import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";

import useQuery from "@/hooks/useQuery";
import {
  prevAndNextNodeAtom,
  selectedNodeAtom,
  selectNodeIdAtom,
} from "@/jotai/flow/details";

export const useNodeDetailsControl = () => {
  const { id, query, set, remove } = useQuery();
  const selectNode = useAtomValue(selectedNodeAtom(id));
  const { previous, next } = useAtomValue(prevAndNextNodeAtom(id));

  const [nodeId, select] = useAtom(selectNodeIdAtom);

  useEffect(() => {
    if (query.nodeId) {
      select(query.nodeId);
    }
  }, [query.nodeId, select]);

  const handleNext = {
    has: () => !!next,
    go: () => {
      if (next) {
        select(next.id);
      }
    },
  };

  const handlePrev = {
    has: () => !!previous,
    go: () => {
      if (previous) {
        select(previous.id);
      }
    },
  };

  return {
    selectId: nodeId,
    selectNode: selectNode,
    select: (id: string) => {
      if (id === query.nodeId) {
        remove("n");
        select(null);
        return;
      }
      set("n", id);
    },
    remove: () => {
      select(null);
      remove("n");
    },
    next: handleNext,
    prev: handlePrev,
  };
};
