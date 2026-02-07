import { useEffect, useState } from "react";
import UnassignedSeat from "./UnassignedSeat";
import { findGuest, insertGuest, removeGuestByIndex } from "../utils";

function UnassignedList({
  isMobile,
  unassignedHead,
  tables,
  setTables,
}: {
  isMobile: boolean;
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

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
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
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      className={`big-component min-w-[215px] min-h-50 flex-col ${isMobile ? "" : "sticky top-[68px]"}`}
    >
      <h2 className="component-title">Unassigned List</h2>

      <div className="flex flex-col flex-1">
        {unassigned.length === 0 && (
          <div
            id="that_one"
            className="bg-gray-200 border border-dashed border-gray-400 rounded-md flex flex-1 items-center justify-center text-sm text-gray-500/50 italic select-none"
          >
            Drag here to unassign guest
          </div>
        )}
        <ul className="list-container">
          {unassigned.map((guest, index) => (
            <UnassignedSeat key={index} guest={guest} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UnassignedList;
