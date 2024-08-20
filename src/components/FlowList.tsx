"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ExclamationCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

import { useFlowPageList } from "@/hooks/useFlowPageList";
import type { PageListItem } from "@/jotai/storage/local";

const formatDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");

  return [year, month, day].join("/");
};

function Item({
  id,
  value,
  onChange,
  onDelete,
}: {
  id: string;
  value: PageListItem;
  onChange: (value: Omit<PageListItem, "update_at">) => void;
  onDelete: (id: string) => void;
}) {
  const [title, setTitle] = useState(value.title);
  const [isOK, setOK] = useState(true);

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setOK(event.target.value !== null);
    setTitle(event.target.value);
  };

  return (
    <div
      key={id}
      className="flex flex-nowrap space-x-1 divide-neutral-500 divide-x group h-auto text-neutral-200"
    >
      <div className="flex-0 min-w-8 flex items-center justify-center">
        <button
          className={clsx(
            "invisible group-hover:visible rounded bg-neutral-300 text-neutral-500 dark:bg-neutral-900",
            "text-neutral-400 hover:text-red-700 hover:bg-neutral-400 dark:hover:bg-neutral-800 p-1"
          )}
          onClick={() => onDelete(id)}
          type="button"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-0 min-w-44 max-w-44 relative mx-2 min-h-8 flex items-center">
        <input
          type="text"
          className={clsx(
            "px-2 break-words whitespace-pre-wrap underline decoration-neutral-400 w-full rounded-md",
            "bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-300",
            "outline-none shadow-outline",
            "focus:absolute focus:left-0 focus:py-1 focus:top-0 focus:cursor-auto focus:placeholder:visible  focus:z-10",
            "focus:bg-neutral-300 dark:focus:bg-neutral-700",
            "hover:cursor-pointer",
            isOK ? "" : "border-2 border-red-500 text-red-500"
          )}
          value={title}
          onChange={updateTitle}
          onBlur={(e) => {
            if (!title) {
              setOK(false);
              e.target.focus();
              return;
            }

            onChange({
              id: value.id,
              title,
              created_at: value.created_at,
            });
          }}
        />
        <div
          className={clsx(
            "absolute right-0 rounded-md  text-sm invisible text-neutral-400",
            "bg-neutral-300 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-300",
            "group-hover:visible",
            "hover:bg-neutral-400 dark:hover:bg-neutral-700"
          )}
        >
          <div className="px-2 py-0.5">
            <Link className="" href={`/reactflow/${id}`}>
              開く
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-1 text-sm flex items-center px-1 min-w-28">
        <div className="px-2 text-neutral-500 dark:text-neutral-300">
          {formatDate(value.created_at)}
        </div>
      </div>
      <div className="flex-1 text-sm flex items-center px-1 min-w-28">
        <div className="px-2 text-neutral-500 dark:text-neutral-300">
          {formatDate(value.update_at)}
        </div>
      </div>
    </div>
  );
}

export default function FlowList() {
  const {
    pageList,
    hasNext,
    hasPrev,
    prevPage,
    nextPage,
    addPageList,
    updatePageList,
    deletePageList,
  } = useFlowPageList();
  const [newTitle, setTitle] = useState("");
  const [isOK, setOK] = useState(false);

  useEffect(() => {
    if (newTitle) {
      setOK(true);
      return;
    }

    setOK(false);
  }, [newTitle]);

  const addNewPage = () => {
    if (!isOK) {
      return;
    }

    addPageList({
      title: newTitle,
    });

    setTitle("");
  };

  const deletePage = (id: string) => {
    deletePageList(id);
  };

  return (
    <div
      className={clsx(
        "flex flex-col w-full h-full",
        "items-center justify-items-center"
      )}
    >
      <div className="mt-12 flex flex-col">
        <div className="">
          <div className="m-2 flex items-center relative">
            <button
              type="button"
              disabled={!isOK}
              className={clsx(
                "rounded-md p-1 ",
                "bg-neutral-200 dark:bg-neutral-800",
                "dark:text-neutral-400",
                isOK
                  ? "hover:bg-neutral-300 dark:hover:bg-neutral-700"
                  : "group relative hover:cursor-not-allowed"
              )}
              onClick={addNewPage}
            >
              <div
                className={clsx(
                  isOK
                    ? "hidden"
                    : "invisible group-hover:visible absolute -top-9 bg-neutral-200 dark:bg-neutral-700 rounded-md w-64",
                  "text-red-500 flex px-2 py-1 items-center z-30"
                )}
              >
                <ExclamationCircleIcon className="w-5 h-5" />
                <div className="px-2 text-xs dark:text-neutral-400 text-neutral-500">
                  ページタイトルを入力をしてください
                </div>
              </div>
              <PlusIcon className="w-4 h-4 text-neutral-500" />
            </button>
            <div className="relative flex-1">
              <input
                type="text"
                className={clsx(
                  " ml-2 px-3 rounded-md accent-inherit outline-none shadow-outline text-sm placeholder:invisible",
                  "min-w-72",
                  "bg-neutral-200 dark:bg-neutral-800",
                  "text-neutral-500 dark:text-neutral-300",
                  "focus:absolute focus:left-0 focus:py-1 focus:-top-3.5 focus:cursor-auto focus:placeholder:visible",
                  "hover:cursor-pointer hover:absolute hover:left-0 hover:py-1 hover:-top-3.5 hover:placeholder:visible"
                )}
                placeholder="タイトルを入力"
                value={newTitle}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-none justify-center items-center space-x-2">
              <div className="flex-1 flex justify-center">
                <button
                  type="button"
                  disabled={!hasPrev}
                  className={clsx(
                    "rounded  px-2 py-1 text-xs",
                    "bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
                    hasPrev
                      ? "bg-neutral-300 hover:bg-neutral-800"
                      : "hover:cursor-not-allowed"
                  )}
                  onClick={() => prevPage()}
                >
                  前へ
                </button>
              </div>
              <div className="flex-1 flex justify-center">
                <button
                  disabled={!hasNext}
                  type="button"
                  className={clsx(
                    "rounded  px-2 py-1 text-xs",
                    "bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
                    hasNext
                      ? "hover:bg-neutral-700"
                      : "hover:cursor-not-allowed"
                  )}
                  onClick={() => nextPage()}
                >
                  次へ
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex-grow w-full flex flex-col justify-center items-center ">
          <div className="w-fit divide-slate-500 divide-y border-y">
            <div className="flex flex-nowrap space-x-1 divide-neutral-500 divide-x group h-auto text-neutral-200">
              <div className="flex-0 min-w-8" />
              <div className="flex-0 min-w-44 max-w-44 relative mx-2 min-h-8 flex items-center">
                <div className="px-2 text-neutral-500 dark:text-neutral-300">
                  タイトル
                </div>
              </div>
              <div className="flex-1 text-sm flex items-center px-1 min-w-28">
                <div className="px-2 text-neutral-500 dark:text-neutral-300">
                  作成日
                </div>
              </div>
              <div className="flex-1 text-sm flex items-center px-1 min-w-28">
                <div className="px-2 text-neutral-500 dark:text-neutral-300">
                  更新日
                </div>
              </div>
            </div>
            {pageList?.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                value={item}
                onDelete={deletePage}
                onChange={updatePageList}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
