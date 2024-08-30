import { use, useEffect, useState } from "react";
import clsx from "clsx";
import { Resizable } from "re-resizable";

import { useNodeDetailsControl } from "@/hooks/useNodeDetailsControl";
import { Transition } from "@headlessui/react";
import MarkdownDetail from "@/components/tools/details/MarkdownDetail";
import TableDetail from "@/components/tools/details/TableDetail";

const WIDTH_MIN = 500;

export default function FlowSidePeek() {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(WIDTH_MIN);
  const { selectId, selectNode, remove } = useNodeDetailsControl();

  useEffect(() => {
    setOpen(!!selectId);
  }, [selectId]);

  // useEffect(() => {
  // }, [width]);

  return (
    <Transition
      show={open}
      as={"div"}
      id="flow-side-peek"
      className={clsx(
        "h-full w-fit",
        "flex flex-col absolute right-0",
        "ease-in-out transition",
        "data-[enter]:duration-100 data-[enter]:data-[closed]:translate-x-full",
        "data-[leave]:duration-100 data-[leave]:data-[closed]:translate-x-full"
      )}
    >
      <Resizable
        defaultSize={{ width, height: "100%" }}
        minWidth={"25vw"}
        maxWidth={"70vw"}
        bounds="window"
        boundsByDirection
        enable={{ left: true }}
        onResize={(e, direction, ref, d) => {
          setWidth(WIDTH_MIN + d.width);
        }}
        className={clsx(
          "bg-neutral-100 dark:bg-neutral-700",
          "shadow-2xl",
          "border-l-4 border-neutral-400 dark:border-neutral-500",
          ""
        )}
      >
        <div
          className={clsx(
            "flex flex-col h-full",
            "bg-neutral-100 dark:bg-neutral-700",
            "shadow-2xl"
          )}
        >
          {selectNode?.type === "markdown" && (
            <MarkdownDetail node={selectNode} remove={remove} />
          )}
          {selectNode?.type === "table" && (
            <TableDetail node={selectNode} remove={remove} />
          )}
        </div>
      </Resizable>
    </Transition>
  );
}
