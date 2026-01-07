function UnassignedSeat({ guest }: { guest: Person }) {
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData("text", JSON.stringify(guest));
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

export default UnassignedSeat;
