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
      className="border rounded-md p-5 pt-2 mr-5"
    >
      <h3>Table {table.index}</h3>
      <ul>
        {seatList.map((guest, index) => (
          <Seat key={index} guest={guest} />
        ))}
        {Array.from({ length: table.seats - table.seatsOccupied }).map(
          (_, index) => (
            <EmptySeat key={index} />
          )
        )}
      </ul>
      <button
        onClick={() => removeTable()}
        className="m-1 p-2 pt-1 pb-1 bg-amber-500 rounded-sm shadow-gray-500 hover:shadow-md"
      >
        Remove
      </button>
    </div>
  );
}

export default Table;
