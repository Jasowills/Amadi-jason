import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative w-full max-w-md">
      <IoSearchOutline
        className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
        size={16}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 font-body text-sm
          bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06] rounded-sm
          placeholder:opacity-30 focus:outline-none focus:border-accent/30
          transition-colors duration-300"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-70 transition-opacity"
          aria-label="Clear search"
        >
          <IoCloseOutline size={16} />
        </button>
      )}
    </div>
  );
}
