import { useEffect, useState } from "react";

import { useAtomValue, useAtom } from "jotai";
import { useAtomCallback, RESET } from "jotai/utils";
import { v4 as uuid } from "uuid";

import {
  pageListAtom,
  hasNextPrevPageAtom,
  currentPageAtom,
} from "@/jotai/flow/list";
import { pageAtom } from "@/jotai/flow/page";
import {
  type PageListItem,
  pageListLocalAtom,
  defaultPage,
} from "@/jotai/storage/local";

export const useFlowPageList = () => {
  const [page, setPage] = useAtom(currentPageAtom);
  const [list, setList] = useState<PageListItem[]>([]);
  const pageList = useAtomValue(pageListAtom(page));
  const { hasPrev, hasNext } = useAtomValue(hasNextPrevPageAtom);
  const [isPrev, setPrev] = useState(true);
  const [isNext, setNext] = useState(true);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(0, prev - 1));

  useEffect(() => {
    setPrev(hasPrev);
  }, [hasPrev]);

  useEffect(() => {
    setNext(hasNext);
  }, [hasNext]);

  useEffect(() => {
    setList(pageList);
  }, [pageList]);

  return {
    pageList: list,
    current: page,
    hasPrev: isPrev,
    hasNext: isNext,
    nextPage,
    prevPage,
    addPageList: useAtomCallback(
      (
        get,
        set,
        item: Omit<PageListItem, "id" | "created_at" | "update_at">
      ) => {
        const id = uuid();

        set(pageListAtom(page), {
          id: id,
          ...item,
          created_at: new Date().toISOString(),
          update_at: new Date().toISOString(),
        });

        set(pageAtom(id), defaultPage({ id, title: item.title }));
      }
    ),
    updatePageList: useAtomCallback(
      (get, set, update: Omit<PageListItem, "update_at">) => {
        const pageList = get(pageListLocalAtom);

        const hasItem = pageList.some((item) => item.id === update.id);

        if (!hasItem) {
          throw new Error("Item not found");
        }

        set(pageListAtom(page), {
          ...update,
          update_at: new Date().toISOString(),
        });
      }
    ),
    deletePageList: useAtomCallback((get, set, update: string) => {
      const pageList = get(pageListLocalAtom);

      const index = pageList.findIndex((item) => item.id === update);

      if (index === -1) {
        throw new Error("Item not found");
      }

      const newList = [...pageList];
      newList.splice(index, 1);

      set(pageAtom(update), RESET);

      set(pageListLocalAtom, newList);
    }),
  };
};
