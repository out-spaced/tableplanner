import { useState } from "react";
import Table from "./Table";

function TableList({ setGuests }: { setGuests: Function }) {
  const [tables, setTables] = useState<Table[]>([]);

  const addTable = () => {
    setTables((prev) => [
      ...prev,
      { index: tables.length + 1, seats: 3, people: [] },
    ]);
  };

  return (
    <div className="border rounded-md p-5 pt-2 mr-5">
      <div>
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
