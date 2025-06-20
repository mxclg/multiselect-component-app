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
    <div
      className="flex flex-col w-[90vw] max-w-lg h-[80vh] bg-[#ffffff] p-4 rounded-xl shadow-xl"
      onMouseDown={() => setIsClickInside(true)}
      onBlur={() => {
        if (!isClickInside) setIsOpen(false);
        setIsClickInside(false);
      }}
      tabIndex={0} // ← чтобы div мог ловить onBlur
    >
      {selectedOptions.length > 0 && (
        <div>
          <h2>Selected Timezones:</h2>
          <button onClick={() => onSelectionChange([])}>Clear all</button>
          <ul>
            {selectedOptions.map((option) => (
              <li key={option.value}>
                {option.label}{" "}
                <button onClick={() => handleDelete(option.value)}>
                  delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && (
        <ul className="max-h-60 overflow-y-auto">
          {options
            .filter((option) =>
              option.label.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((option) => (
              <li
                key={option.value}
                style={{ cursor: "pointer" }}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Multiselect;
