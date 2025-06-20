import { useState } from "react";

const Multiselect = ({
  options,
  selectedOptions,
  onSelectionChange,
  placeholder = "Search...",
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // поиск
  const [isOpen, setIsOpen] = useState(false); // открыт ли список

  const handleSelect = (option) => {
    if (!selectedOptions.find((o) => o.value === option.value)) {
      onSelectionChange([...selectedOptions, option]); // ← сообщаем родителю
    }
  };

  const handleDelete = (value) => {
    const updated = selectedOptions.filter((o) => o.value !== value);
    onSelectionChange(updated); // ← сообщаем родителю
  };

  return (
    <div>
      <h2>Selected Timezones:</h2>
      {selectedOptions.length > 0 && (
        <button onClick={() => onSelectionChange([])}>Clear all</button> // ← теперь очищает через props
      )}
      <ul>
        {selectedOptions.map((option) => (
          <li key={option.value}>
            {option.label}{" "}
            <button onClick={() => handleDelete(option.value)}>delete</button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        style={{ marginBottom: "10px", display: "block" }}
      />

      {isOpen && (
        <ul>
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
