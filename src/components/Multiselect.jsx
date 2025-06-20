import { useEffect, useState } from "react";

const Multiselect = () => {
  const [options, setOptions] = useState([]);

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

  return (
    <div>
      <h2>Timezones:</h2>
      <ul>
        {options.map((option) => (
          <li key={option.value}>{option.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default Multiselect;
