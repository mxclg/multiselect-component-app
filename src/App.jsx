import { useEffect, useState } from "react";
import Multiselect from "./components/Multiselect";

function App() {
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

  return (
    <div className="flex items-center justify-center h-screen bg-[#fff7f5]">
      <Multiselect
        options={options}
        selectedOptions={selectedOptions}
        onSelectionChange={setSelectedOptions}
        placeholder="Search timezone..."
      />
    </div>
  );
}

export default App;
