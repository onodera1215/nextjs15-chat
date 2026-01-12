import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchInput(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  const { className, ...propsWithoutClassName } = props?.className
    ? { className: props.className, ...props }
    : { ...props, className: "" };
  return (
    <div
      className={`relative w-full max-w-md ${className}`}
      {...propsWithoutClassName}
    >
      <input
        type="text"
        placeholder="検索"
        className="w-full pl-4 pr-10 py-2 rounded-full text-primary  focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white transition"
      />
      <button className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
