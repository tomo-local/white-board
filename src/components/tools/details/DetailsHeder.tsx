import IconButton from "@/components/common/button/IconButton";
import {
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { useNodeDetailsControl } from "@/hooks/useNodeDetailsControl";

type DetailsHederProps = {
  onDelete: () => void;
};

export default function DetailsHeder({ onDelete }: DetailsHederProps) {
  const { remove, prev, next } = useNodeDetailsControl();

  return (
    <div className="flex p-2 flex-none w-full justify-between ">
      <div className="flex h-full space-x-1">
        <IconButton
          type="button"
          onClick={() => {
            remove();
          }}
          chip="閉じる"
          className="hover:bg-neutral-300 dark:hover:bg-neutral-500"
        >
          <ChevronDoubleRightIcon className="w-4 h-4" />
        </IconButton>
        <div className="border-l border-stone-400 my-1.5" />
        <IconButton
          type="button"
          className="disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-300 dark:hover:bg-neutral-500"
          disabled={!prev.has()}
          onClick={() => prev.go()}
        >
          <ChevronUpIcon className="w-4 h-4" />
        </IconButton>
        <IconButton
          type="button"
          className="disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-300 dark:hover:bg-neutral-500"
          disabled={!next.has()}
          onClick={() => next.go()}
        >
          <ChevronDownIcon className="w-4 h-4" />
        </IconButton>
      </div>
      <div className="flex h-full space-x-1">
        <IconButton
          type="button"
          className="hover:bg-neutral-300 dark:hover:bg-neutral-500"
          onClick={onDelete}
        >
          <TrashIcon className="w-4 h-4" />
        </IconButton>
        <IconButton type="button">
          <EllipsisHorizontalIcon className="w-4 h-4" />
        </IconButton>
      </div>
    </div>
  );
}
