// change option labels

import { useDropdown } from "@/hooks/useDropdown";

export default function CreateButton() {
  const { ref, open, toggle, setOpen } = useDropdown<HTMLDivElement>();

  return (
    <div ref={ref} className="relative">
      {/* Button */}
      <div
        onClick={toggle}
        className="
          flex items-center justify-center
          px-4 md:px-5
          py-2 md:py-2.5
          min-h-[40px] md:min-h-[44px]
          border border-text
          bg-text text-bg
          rounded-full
          text-sm md:text-base
          hover:border-black/80 hover:bg-black/80
          cursor-pointer select-none
        "
      >
        <span className="hidden md:block">+ Create</span>
        <span className="block md:hidden">Create</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 rounded-xl border bg-white shadow-lg p-2 z-50">
          <button
            onClick={() => setOpen(false)}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Create new miniapp
          </button>

          <button
            onClick={() => setOpen(false)}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Already have a miniapp
          </button>
        </div>
      )}
    </div>
  );
}
