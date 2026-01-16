import { useState } from "react";
import Table from "./Table";

function TableList({
  tables,
  setTables,
}: {
  tables: Table[];
  setTables: Function;
}) {
  const [tableSize, setTableSize] = useState<number>(6);

  const createTable = (index: number, seats: number): Table => {
    return {
      index,
      seats,
      seatsOccupied: 0,
      next: null,
    };
  };

  const addTable = () => {
    const newTable = createTable(tables.length, tableSize);
    setTables((prev: Table[]) => [...prev, newTable]);
  };

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
      {tables.slice(1).map((table, index) => (
        <Table
          key={index}
          table={table}
          tables={tables}
          setTables={setTables}
        />
      ))}
    </div>
  );
}

export default TableList;
