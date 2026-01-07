function Seat({ guest }: { guest: Person }) {
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(guest));
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <li
      draggable="true"
      onDragStart={handleDragStart}
      className="border rounded-md"
    >
      {guest.name}
    </li>
  );
}

export default Seat;
