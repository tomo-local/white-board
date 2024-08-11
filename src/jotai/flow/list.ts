import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { pageListLocalAtom, type PageListItem } from "@/jotai/storage/local";

export const pageListAtom = atomFamily((page: number) =>
  atom(
    (get) => {
      const pageList = get(pageListLocalAtom);
      const reverseList = [...pageList].reverse();
      const start = page * 10;
      const end = start + 10;
      return reverseList.slice(start, end);
    },
    (get, set, update: PageListItem) => {
      const pageList = get(pageListLocalAtom);

      const index = pageList.findIndex((item) => item.id === update.id);

      if (index === -1) {
        set(pageListLocalAtom, [...pageList, update]);
        return [...pageList, update];
      }

      const newPageList = [...pageList];
      newPageList[index] = update;

      set(pageListLocalAtom, newPageList);

      return newPageList;
    }
  )
);

export const currentPageAtom = atom(0);

export const hasNextPrevPageAtom = atom((get) => {
  const page = get(pageListLocalAtom);
  const count = page.length;
  const current = get(currentPageAtom);

  return {
    hasPrev: current > 0,
    hasNext: count > current * 10 + 10,
  };
});
