import { useState } from "react";

function Seat({ guest }: { guest: Person }) {
  const [dragging, setDragging] = useState(false);
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    setDragging(true);
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ index: guest.index, table: guest.table }),
    );
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className={`${dragging ? "opacity-0" : ""}`}>
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
  );
}

export default Seat;
