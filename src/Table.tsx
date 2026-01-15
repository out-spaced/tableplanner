import { useState, useEffect } from "react";
import Seat from "./Seat";
import EmptySeat from "./EmptySeat";
import { findGuest, insertGuest, removeGuestByIndex } from "./utils";

function Table({
  table,
  guests,
  setGuests,
}: {
  table: Table;
  guests: Table[];
  setGuests: Function;
}) {
  const [seatList, setSeatList] = useState<Person[]>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const tableIsFull = () => {
    return table.seatsOccupied >= table.seats;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const dragData = JSON.parse(data);
    if (!tableIsFull()) {
      const movedGuest = findGuest(dragData.index, guests[dragData.table]);
      if (movedGuest == null) return;
      removeGuestByIndex(dragData.index, guests[dragData.table]);
      const oldTable = { ...guests[dragData.table] };
      insertGuest(movedGuest, table);
      const newTable = { ...guests[table.index] };
      const newGuests = [...guests];
      newGuests[table.index] = newTable;
      newGuests[dragData.table] = oldTable;
      setGuests(newGuests);
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
    </div>
  );
}

export default Table;
