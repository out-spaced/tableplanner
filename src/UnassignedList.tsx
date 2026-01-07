import { useEffect, useState } from "react";
import Seat from "./Seat";

function UnassignedList({ guests }: { guests: Person[] }) {
  const [unassigned, setUnassigned] = useState<Person[]>([]);

  useEffect(() => {
    setUnassigned(guests.filter((guest) => !guest.table));
  }, [guests]);

  return (
    <div className="border rounded-md pl-5 pr-5 pt-2 pb-5">
      <h3>Unassigned List</h3>
      <div></div>

      <div>
        <ul>
          {unassigned.map((guest, index) => (
            <Seat key={index} guest={guest} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UnassignedList;
