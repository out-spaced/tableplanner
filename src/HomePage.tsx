import { useState } from "react";
import GuestList from "./GuestList";
import TableList from "./TableList";
import UnassignedList from "./UnassignedList";
import ExportButton from "./ExportButton";
import ImportButton from "./ImportButton";

function HomePage() {
  const [tables, setTables] = useState<Table[]>([
    { index: 0, seats: 5000, seatsOccupied: 0, next: null }, //create unassigned table
  ]);

  const reset = () => {
    setTables([{ index: 0, seats: 5000, seatsOccupied: 0, next: null }]);
  };

  return (
    <div className="flex justify-center pt-16 pb-4">
      <div>
        <ImportButton setTables={setTables} />
        <ExportButton tables={tables} />
        <button
          onClick={() => reset()}
          className="m-1 p-2 pt-1 pb-1 bg-amber-500 rounded-sm shadow-gray-500 hover:shadow-md"
        >
          Reset
        </button>
      </div>
      <TableList tables={tables} setTables={setTables} />
      <UnassignedList
        tables={tables}
        setTables={setTables}
        unassignedHead={tables[0]}
      />
      <GuestList tables={tables} setTables={setTables} />
    </div>
  );
}

export default HomePage;
