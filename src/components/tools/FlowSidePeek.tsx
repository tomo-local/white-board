import { useEffect, useState } from "react";
import clsx from "clsx";

import { useNodeDetailsControl } from "@/hooks/useNodeDetailsControl";
import { Transition } from "@headlessui/react";
import MarkdownDetails from "@/components/tools/details/MarkdownDetails";

export default function FlowSidePeek() {
  const [open, setOpen] = useState(false);
  const { selectId, selectNode, remove } = useNodeDetailsControl();

  useEffect(() => {
    if (selectId) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [selectId]);

  return (
    <Transition
      show={open}
      as={"div"}
      id="flow-side-peek"
      className={clsx(
        "min-w-[450px] w-[30vw] h-full",
        "flex flex-col h-full fixed right-0",
        "ease-in-out transition",
        "data-[enter]:duration-100 data-[enter]:data-[closed]:translate-x-full",
        "data-[leave]:duration-100 data-[leave]:data-[closed]:translate-x-full"
      )}
    >
      <div
        className={clsx(
          "flex flex-col h-full",
          "bg-neutral-100 dark:bg-neutral-700",
          "shadow-2xl ",
          "border-l-2 border-neutral-400 dark:border-neutral-500"
        )}
      >
        {selectNode?.type === "markdown" && (
          <MarkdownDetails node={selectNode} remove={remove} />
        )}
      </div>
    </Transition>
  );
}
