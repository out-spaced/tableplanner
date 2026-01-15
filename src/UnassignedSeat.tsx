function UnassignedSeat({ guest }: { guest: Person }) {
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ index: guest.index, table: 0 })
    );
    e.dataTransfer.effectAllowed = "move";
  };

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
