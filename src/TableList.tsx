import { useState, useEffect } from "react";
import Table from "./Table";

function TableList({
  setGuests,
  removed,
  setRemoved,
}: {
  guests: Person[];
  setGuests: Function;
  removed: Person | null;
  setRemoved: Function;
}) {
  const [tables, setTables] = useState<Table[]>([]);
  const [tableSize, setTableSize] = useState<number>(6);

  const addTable = () => {
    setTables((prev) => [
      ...prev,
      { index: tables.length + 1, seats: tableSize, people: [] },
    ]);
  };

  useEffect(() => {
    if (removed) {
      const removedTableNum: number = removed.table - 1;
      const removedSeatNum: number = removed.seat;
      const currentTable: Table = tables[removedTableNum];
      const newPeople: Person[] = currentTable.people.filter(
        (person) => person.seat !== removedSeatNum
      );
      // update seat numbers
      newPeople.forEach((person) => {
        if (person.seat > removedSeatNum) {
          person.seat--;
        }
      });
      const newTable: Table = {
        ...currentTable,
        people: newPeople,
      };
      setTables((prev) => {
        const newTables: Table[] = [...prev];
        newTables[removedTableNum] = newTable;
        return newTables;
      });
      setRemoved(null);
    }
  }, [removed]);

  return (
    <div className="border rounded-md p-5 pt-2 mr-5">
      <div>
        <select
          value={tableSize}
          onChange={(e) => setTableSize(parseInt(e.target.value, 10))}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <button
          className="m-1 p-2 pt-1 pb-1 bg-green-500 rounded-sm shadow-gray-500 hover:shadow-md"
          onClick={() => addTable()}
        >
          Add
        </button>
      </div>
      {tables.map((table, index) => (
        <Table
          key={index}
          table={table}
          setTables={setTables}
          setGuests={setGuests}
        />
      ))}
    </div>
  );
}

export default TableList;
