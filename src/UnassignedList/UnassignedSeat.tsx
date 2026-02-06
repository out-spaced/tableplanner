function UnassignedSeat({ guest }: { guest: Person }) {
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ index: guest.index, table: 0 }),
    );
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <li
      draggable="true"
      onDragStart={handleDragStart}
      className={`
        ${guest.paid ? "bg-green-300" : "bg-red-300"}
        text-sm p-1 mb-1 mt-2 rounded-sm select-none touch-none hover:shadow-md shadow-gray-500`}
    >
      {guest.name}
    </li>
  );
}

export default UnassignedSeat;
