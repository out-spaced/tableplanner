import { useState } from "react";

function Seat({ guest }: { guest: Person }) {
  const [dragging, setDragging] = useState(false);
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ index: guest.index, table: guest.table }),
    );
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => setDragging(true), 0);
  };

  return (
    <div
      className={`${dragging ? "border rounded-md -mt-px -mb-px bg-gray-200" : ""}`}
    >
      <div className={`box-content ${dragging ? "opacity-0" : ""}`}>
        <li
          draggable="true"
          onDragStart={handleDragStart}
          onDragEnd={() => setDragging(false)}
          className={`
          text-xs h-8 font-medium select-none touch-none
          ${guest.paid ? "bg-green-300" : "bg-red-300"}
          border rounded-md flex justify-center items-center text-center`}
        >
          <div>{guest.name}</div>
        </li>
      </div>
    </div>
  );
}

export default Seat;
