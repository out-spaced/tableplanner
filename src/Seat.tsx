function Seat({ guest }: { guest: Person | EmptyPerson }) {
  if (guest.name == "empty")
    return <li className="border rounded-md">empty</li>;
  return (
    <li
      className={`
        ${guest.paid ? "bg-green-400" : "bg-red-400"}
        border rounded-md`}
    >
      {guest.name}
    </li>
  );
}

export default Seat;
