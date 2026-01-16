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

  const removeTable = () => {
<<<<<<< HEAD
=======
    // start with tablehead

>>>>>>> 2771bf560fbc67828a0151a95d6f67ae33e0c45d
    const newGuests = [...guests];
    newGuests[0] = { ...guests[0] };
    let ptr = table.next;
    while (ptr != null) {
      const next = ptr.next;
      insertGuest(ptr, newGuests[0]);
      ptr = next;
    }
<<<<<<< HEAD
    const currentTableIndex = guests.indexOf(table);
    if (currentTableIndex > -1) {
      newGuests.splice(currentTableIndex, 1);
      for (let i = currentTableIndex; i < newGuests.length; i++) {
        newGuests[i] = { ...newGuests[i], index: i };
        let guestPtr = newGuests[i].next;
        while (guestPtr != null) {
          guestPtr.table = i;
          guestPtr = guestPtr.next;
        }
      }
    }
=======
    newGuests.splice(table.index, 1);
>>>>>>> 2771bf560fbc67828a0151a95d6f67ae33e0c45d
    setGuests(newGuests);
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
