import clsx from "clsx";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  chip?: string | React.ReactNode;
};

export default function IconButton(props: IconButtonProps) {
  const { children, className, chip } = props;

  return (
    <button
      {...props}
      className={clsx("p-1 rounded-md group/button relative", className)}
    >
      {chip && (
        <div
          className={clsx(
            "absolute -top-7 -right-2 z-10",
            "group-hover/button:visible invisible"
          )}
        >
          <div
            className={clsx(
              "text-xs whitespace-nowrap dark:text-neutral-100 text-neutral-600",
              "dark:bg-neutral-600 rounded-md p-1 opacity-90 border border-neutral-400 dark:border-neutral-700"
            )}
          >
            {chip}
          </div>
        </div>
      )}
      {children}
    </button>
  );
}
