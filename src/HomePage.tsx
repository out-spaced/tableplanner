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
      <UnassignedList
        tables={tables}
        setTables={setTables}
        unassignedHead={tables[0]}
      />
      <TableList tables={tables} setTables={setTables} />
      <GuestList tables={tables} setTables={setTables} />
      <div>
        <h2> Actions </h2>
        <ImportButton setTables={setTables} />
        <ExportButton tables={tables} />
        <ResetButton setTables={setTables} />
      </div>
    </div>
  );
}

export default HomePage;
