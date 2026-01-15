import { useEffect, useState } from "react";
import UnassignedSeat from "./UnassignedSeat";
import { findGuest, insertGuest, removeGuestByIndex } from "./utils";

function UnassignedList({
  unassignedHead,
  guests,
  setGuests,
}: {
  unassignedHead: Table;
  guests: Table[];
  setGuests: Function;
}) {
  const [unassigned, setUnassigned] = useState<Person[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const dragData = JSON.parse(data);

    const movedGuest = findGuest(dragData.index, guests[dragData.table]);
    if (movedGuest == null) return;
    removeGuestByIndex(dragData.index, guests[dragData.table]);
    const oldTable = { ...guests[dragData.table] };
    insertGuest(movedGuest, guests[0]);
    const newTable = { ...guests[0] };
    const newGuests = [...guests];
    newGuests[0] = newTable;
    newGuests[dragData.table] = oldTable;
    setGuests(newGuests);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  useEffect(() => {
    let ptr = unassignedHead.next;
    const newUnassigned: Person[] = [];
    while (ptr != null) {
      newUnassigned.push(ptr);
      ptr = ptr.next;
    }
    setUnassigned(newUnassigned);
  }, [unassignedHead]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border rounded-md pl-5 pr-5 pt-2 pb-5"
    >
      <h3>Unassigned List</h3>
      <div></div>

      <div>
        <ul>
          {unassigned.map((guest, index) => (
            <UnassignedSeat key={index} guest={guest} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UnassignedList;
