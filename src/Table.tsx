import { useEffect, useState } from "react";
import Seat from "./Seat";

export default function Table({ table }: { table: Table }) {
  const [emptySeats, setEmptySeats] = useState<Person[]>([]);
  useEffect(() => {
    const numEmpty: number = table.seats - table.people.length;
    const emptyArray: Person[] = [];
    for (let i = 0; i < numEmpty; i++) {
      emptyArray.push({ name: "empty", paid: false, table: 0, seat: 0 });
    }
    setEmptySeats(emptyArray);
  }, [table]);
  return (
    <div className="border rounded-md p-5 pt-2 mr-5">
      <h3>Table</h3>
      <ul>
        {table.people.map((guest, index) => (
          <Seat key={index} guest={guest} />
        ))}
        {emptySeats.map((guest, index) => (
          <Seat key={index} guest={guest} />
        ))}
      </ul>
    </div>
  );
}
