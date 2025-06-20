import { useEffect, useState } from "react";

const Multiselect = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchTimezones = async () => {
      try {
        const res = await fetch(
          "https://timeapi.io/api/timezone/availabletimezones"
        );
        const data = await res.json();
        const formatted = data.map((item) => ({ label: item, value: item }));
        setOptions(formatted);
      } catch (error) {
        console.error("Failed to fetch timezones", error);
      }
    };

    fetchTimezones();
  }, []);

  const handleSelect = (option) => {
    if (!selectedOptions.find((o) => o.value === option.value)) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleDelete = (value) => {
    setSelectedOptions(selectedOptions.filter((o) => o.value !== value));
  };

  return (
    <div>
      <h2>Selected Timezones:</h2>
      <ul>
        {selectedOptions.map((option) => (
          <li key={option.value}>
            {option.label}{" "}
            <button onClick={() => handleDelete(option.value)}>delete</button>
          </li>
        ))}
      </ul>

      <h2>All Timezones:</h2>
      <ul>
        {options.map((option) => (
          <li
            key={option.value}
            style={{ cursor: "pointer" }}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Multiselect;
