import { useEffect, useState } from "react";
import UnassignedSeat from "./UnassignedSeat";

function UnassignedList({ unassignedHead }: { unassignedHead: Table }) {
  const [unassigned, setUnassigned] = useState<Person[]>([]);

  useEffect(() => {
    setUnassigned(() => {
      let ptr = unassignedHead.next;
      const newUnassigned: Person[] = [];
      while (ptr != null) {
        newUnassigned.push(ptr);
        ptr = ptr.next;
      }
      return newUnassigned;
    });
  }, [unassignedHead]);

  return (
    <div className="border rounded-md pl-5 pr-5 pt-2 pb-5">
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
