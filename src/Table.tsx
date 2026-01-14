import { useState, useEffect } from "react";
import Seat from "./Seat";
import { insertGuest, removeGuestByIndex } from "./utils";

function Table({ table, setGuests }: { table: Table; setGuests: Function }) {
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
    const guest = JSON.parse(data);
    if (!tableIsFull()) {
      setGuests((prev: Table[]) => {
        const oldTableIndex = guest.table;
        removeGuestByIndex(guest.index, prev[oldTableIndex]);
        insertGuest(guest, table);
        const newGuests = [...prev];
        newGuests[table.index] = { ...prev[table.index] };
        newGuests[oldTableIndex] = { ...prev[oldTableIndex] };
        return newGuests;
      });
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
            <Seat
              key={index}
              guest={{
                name: "empty",
                paid: false,
                table: 0,
                seat: 0,
                index: 0,
                next: null,
                prev: null,
              }}
            />
          )
        )}
      </ul>
    </div>
  );
}

export default Table;
