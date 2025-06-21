import { useState } from "react";

const Multiselect = ({
  options,
  selectedOptions,
  onSelectionChange,
  placeholder = "Search...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isClickInside, setIsClickInside] = useState(false);

  const handleSelect = (option) => {
    if (!selectedOptions.find((o) => o.value === option.value)) {
      onSelectionChange([...selectedOptions, option]);
    }
  };

  const handleDelete = (value) => {
    const updated = selectedOptions.filter((o) => o.value !== value);
    onSelectionChange(updated);
  };

  return (
    <div className="flex w-full max-w-lg bg-white p-4 rounded-xl shadow-xl">
      <div className="w-1/2 pr-2">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full border rounded px-2 py-1"
        />
        {isOpen && (
          <ul className="mt-2 max-h-60 overflow-y-auto border rounded">
            {options
              .filter((o) =>
                o.label.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((option) => (
                <li
                  key={option.value}
                  className="px-2 py-1 cursor-pointer hover:bg-gray-100"
                  onMouseDown={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))}
          </ul>
        )}
      </div>

      <div className="w-1/2 pl-2">
        <h2>Selected Timezones</h2>
        {selectedOptions.length > 0 ? (
          <>
            <button
              onClick={() => onSelectionChange([])}
              className="mb-2 text-sm text-red-500 hover:underline"
            >
              Clear all
            </button>
            <ul>
              {selectedOptions.map((o) => (
                <li
                  key={o.value}
                  className="mb-1 flex justify-between items-center"
                >
                  <span>{o.label}</span>
                  <button
                    onClick={() => handleDelete(o.value)}
                    className="text-red-500 text-sm"
                  >
                    delete
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-gray-500">No timezones selected</p>
        )}
      </div>
    </div>
  );
};

export default Multiselect;
