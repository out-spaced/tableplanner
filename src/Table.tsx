import { useState, useEffect } from "react";
import Seat from "./Seat";
import EmptySeat from "./EmptySeat";
import { findGuest, insertGuest, removeGuestByIndex } from "./utils";

function Table({
  table,
  tables,
  setTables,
}: {
  table: Table;
  tables: Table[];
  setTables: Function;
}) {
  const [seatList, setSeatList] = useState<Person[]>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const tableIsFull = () => {
    return table.seatsOccupied >= table.seats;
  };

  const removeTable = () => {
    const newTables = [...tables];
    newTables[0] = { ...tables[0] };
    let ptr = table.next;
    while (ptr != null) {
      const next = ptr.next;
      insertGuest(ptr, newTables[0]);
      ptr = next;
    }
    const currentTableIndex = tables.indexOf(table);
    if (currentTableIndex > -1) {
      newTables.splice(currentTableIndex, 1);
      for (let i = currentTableIndex; i < newTables.length; i++) {
        newTables[i] = { ...newTables[i], index: i };
        let guestPtr = newTables[i].next;
        while (guestPtr != null) {
          guestPtr.table = i;
          guestPtr = guestPtr.next;
        }
      }
    }
    setTables(newTables);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const dragData = JSON.parse(data);
    if (!tableIsFull()) {
      const movedGuest = findGuest(dragData.index, tables[dragData.table]);
      if (movedGuest == null) return;
      removeGuestByIndex(dragData.index, tables[dragData.table]);
      const oldTable = { ...tables[dragData.table] };
      insertGuest(movedGuest, table);
      const newTable = { ...tables[table.index] };
      const newTables = [...tables];
      newTables[table.index] = newTable;
      newTables[dragData.table] = oldTable;
      setTables(newTables);
    } else {
      // todo: add error for table being full
    }
  };

  useEffect(() => {
    let seatPtr = table.next;
    const seats: Person[] = [];
    while (seatPtr != null) {
      seats.push(seatPtr);
      seatPtr = seatPtr.next;
    }
    setSeatList(seats);
  }, [table]);

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border rounded-md border-dashed p-1"
    >
      <div className="flex justify-between">
        <h3>Table {table.index}</h3>
        <button
          onClick={() => removeTable()}
          className="text-gray-500 rounded-sm transition-colors hover:text-red-500 hover:bg-red-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div>
        <ul className="grid grid-cols-2 gap-1 mt-2">
          {seatList.map((guest, index) => (
            <Seat key={index} guest={guest} />
          ))}
          {Array.from({ length: table.seats - table.seatsOccupied }).map(
            (_, index) => (
              <EmptySeat key={index} />
            ),
          )}
        </ul>
      </div>
    </div>
  );
}

export default Table;
