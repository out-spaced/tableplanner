import { useEffect } from "react";

function UnassignedSeat({ guest }: { guest: Person }) {
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData("text", JSON.stringify(guest));
    e.dataTransfer.effectAllowed = "move";
  };
  useEffect(() => {
    // nothing
  }, [guest.paid]);

  return (
    <li
      draggable="true"
      onDragStart={handleDragStart}
      className={`
        ${guest.paid ? "bg-green-400" : "bg-red-400"}
        border rounded-md`}
    >
      {guest.name}
    </li>
  );
}

export default UnassignedSeat;
