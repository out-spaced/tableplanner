import { useState, useEffect } from "react";
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
    localStorage.setItem("defaultSeatNum", tableSize.toString());
  };

  useEffect(() => {
    const savedSeats = localStorage.getItem("defaultSeatNum");
    if (savedSeats) setTableSize(parseInt(savedSeats, 10));
  }, []);

  return (
    <div className="big-component flex-col grow md:grow-0">
      <h2 className="component-title">Tables</h2>
      <div>
        <select
          id="table-size-select"
          className="focus:ring-2 focus:ring-blue-300 focus:outline-none rounded-md border border-gray-300 p-1 mr-2"
          value={tableSize}
          onChange={(e) => setTableSize(parseInt(e.target.value, 10))}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1} seats
            </option>
          ))}
        </select>
        <button className="btn-default" onClick={() => addTable()}>
          Add Table
        </button>
      </div>
      <div className={`grid  gap-1 grid-cols-1 md:grid-cols-2 md:w-[500px]`}>
        {tables.slice(1).map((table, index) => (
          <Table
            key={index}
            table={table}
            tables={tables}
            setTables={setTables}
          />
        ))}
      </div>
    </div>
  );
}

export default TableList;
