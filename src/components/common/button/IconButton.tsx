import { Button } from "@headlessui/react";
import clsx from "clsx";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  chip?: string | React.ReactNode;
  chipPosition?: "top" | "bottom" | "left" | "right";
};

export default function IconButton(props: IconButtonProps) {
  const { children, className } = props;

  return (
    <Button
      {...props}
      className={clsx(
        "p-1 rounded-md group/button relative text-neutral-500 dark:text-neutral-200",
        className
      )}
    >
      {children}
    </Button>
  );
}
