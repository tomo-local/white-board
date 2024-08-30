"use client";
import { useState } from "react";
import {
  Transition,
  TabGroup,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import clsx from "clsx";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

import NodeList from "@/components/tools/side/NodeList";

const tabs = [{ name: "Node" }, { name: "Edges" }];

export default function FlowSideView() {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="h-full flex flex-row-reverse text-neutral-500 dark:text-neutral-200">
      <button
        type="button"
        className={clsx(
          "dark:hover:bg-neutral-500 dark:bg-neutral-600 bg-neutral-300 hover:bg-neutral-200",
          "border-x border-neutral-400 dark:border-neutral-500",
          "text-neutral-500 dark:text-neutral-400"
        )}
        onClick={() => setOpen(!open)}
      >
        <ChevronDoubleRightIcon
          className={clsx("w-3 h-3", open && "rotate-180")}
        />
      </button>
      <Transition show={open}>
        <div
          className={clsx(
            "min-w-64 max-w-64 bg-neutral-100 dark:bg-neutral-800"
          )}
        >
          <TabGroup
            as={"div"}
            className="flex flex-col h-full"
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
          >
            <TabList className="flex pt-1 ">
              {tabs.map(({ name }) => (
                <Tab
                  key={name}
                  className={clsx(
                    "border-b-2 border-neutral-300 dark:border-neutral-500",
                    "flex-1 p-1 data-[selected]:border-neutral-500 dark:data-[selected]:border-neutral-100"
                  )}
                >
                  {name}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              <TabPanel>
                <NodeList />
              </TabPanel>
              <TabPanel>Content 2</TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </Transition>
    </div>
  );
}
