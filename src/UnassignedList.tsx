import { useEffect, useState } from "react";
import UnassignedSeat from "./UnassignedSeat";
import { findGuest, insertGuest, removeGuestByIndex } from "./utils";

function UnassignedList({
  unassignedHead,
  tables,
  setTables,
}: {
  unassignedHead: Table;
  tables: Table[];
  setTables: Function;
}) {
  const [unassigned, setUnassigned] = useState<Person[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const dragData = JSON.parse(data);

    const movedGuest = findGuest(dragData.index, tables[dragData.table]);
    if (movedGuest == null) return;
    removeGuestByIndex(dragData.index, tables[dragData.table]);
    const oldTable = { ...tables[dragData.table] };
    insertGuest(movedGuest, tables[0]);
    const newTable = { ...tables[0] };
    const newTables = [...tables];
    newTables[0] = newTable;
    if (dragData.table !== 0) {
      newTables[dragData.table] = oldTable;
    }
    setTables(newTables);
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
      className="border rounded-md min-h-50 min-w-60 p-2 flex flex-col"
    >
      <h3 className="select-none text-center">Unassigned List</h3>

      <div className="flex flex-col flex-1">
        {unassigned.length === 0 && (
          <div
            id="that_one"
            className="flex flex-1 items-center justify-center text-gray-500"
          >
            Drag here to unassign guest
          </div>
        )}
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
