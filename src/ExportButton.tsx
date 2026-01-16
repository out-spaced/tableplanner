import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

function ExportButton({ tables }: { tables: Table[] }) {
  const [data, setData] = useState<(string | number | boolean)[][]>([]);
  // save format:
  // ['table', index, seats, seatsOccupied]
  // ['guest', index, name, paid, table]
  useEffect(() => {
    const newData: (string | number | boolean)[][] = [];
    tables.forEach((table) => {
      newData.push(["table", table.index, table.seats, table.seatsOccupied]);
      let ptr = table.next;
      while (ptr != null) {
        newData.push(["guest", ptr.index, ptr.name, ptr.paid, ptr.table]);
        ptr = ptr.next;
      }
    });
    setData(newData);
  }, [tables]);

  return (
    <CSVLink
      data={data}
      filename={"table-planner.csv"}
      className="m-1 p-2 pt-1 pb-1 bg-blue-300 rounded-sm shadow-gray-500 hover:shadow-md"
    >
      Export
    </CSVLink>
  );
}

export default ExportButton;
