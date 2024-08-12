import clsx from "clsx";
import { useEffect, useState } from "react";

type EditableTextProps = {
  value: string;
  placeholder?: string;
  editable?: boolean;
  onClick?: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: (value?: string) => void;
};

export default function EditableText(props: EditableTextProps) {
  const {
    value: propsValue,
    onClick,
    onChange,
    onSave,
    editable = false,
    placeholder,
  } = props;
  const [value, setValue] = useState(propsValue);
  const [editStart, setEditStart] = useState(false);

  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);

  const handelStartEdit = () => {
    if (!editable) {
      return;
    }
    setEditStart(true);
  };

  const handelEndEdit = () => {
    if (!editStart) {
      return;
    }

    onSave(value);
    setEditStart(false);
  };

  const handelChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editStart) {
      return;
    }
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <div className="relative group text-neutral-500 dark:text-neutral-300">
      {editable ? (
        <input
          type="text"
          className={clsx(
            "w-full dark:bg-neutral-700 px-2 py-1 rounded-md text-sm hover:cursor-pointer",
            "focus:py-2",
            "outline-none shadow-outline"
          )}
          placeholder={placeholder}
          value={value}
          onClick={handelStartEdit}
          onChange={handelChangeValue}
          onBlur={handelEndEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              handelEndEdit();
              e.currentTarget.blur();
            }
          }}
        />
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="dark:bg-neutral-600 rounded-md text-sm max-w-40 text-ellipsis overflow-hidden"
        >
          <span>{value}</span>
        </button>
      )}
    </div>
  );
}
