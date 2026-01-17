function Seat({ guest }: { guest: Person }) {
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ index: guest.index, table: guest.table }),
    );
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <li
      draggable="true"
      onDragStart={handleDragStart}
      className={`
        text-xs h-8 font-medium
        ${guest.paid ? "bg-green-300" : "bg-red-300"}
        border rounded-md flex justify-center items-center text-center`}
    >
      <div>{guest.name}</div>
    </li>
  );
}

export default Seat;
