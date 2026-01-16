import { useState } from "react";
import GuestList from "./GuestList";
import TableList from "./TableList";
import UnassignedList from "./UnassignedList";
import ExportButton from "./ExportButton";
import ImportButton from "./ImportButton";
import ResetButton from "./ResetButton";

function HomePage() {
  const [tables, setTables] = useState<Table[]>([
    { index: 0, seats: 5000, seatsOccupied: 0, next: null }, //create unassigned table
  ]);

  return (
    <div className="flex justify-center pt-16 pb-4">
      <div>
        <ImportButton setTables={setTables} />
        <ExportButton tables={tables} />
      </div>
      <TableList tables={tables} setTables={setTables} />
      <UnassignedList
        tables={tables}
        setTables={setTables}
        unassignedHead={tables[0]}
      />
      <GuestList tables={tables} setTables={setTables} />
      <div>
        <ResetButton setTables={setTables} />
      </div>
    </div>
  );
}

export default HomePage;
