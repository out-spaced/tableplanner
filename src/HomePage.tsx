import { useState } from "react";
import GuestList from "./GuestList";
import TableList from "./TableList";
import UnassignedList from "./UnassignedList";

function HomePage() {
  const [guests, setGuests] = useState<Person[]>([]);
  return (
    <div className="flex justify-center pt-16 pb-4">
      <TableList setGuests={setGuests} />
      <UnassignedList guests={guests} />
      <GuestList guests={guests} setGuests={setGuests} />
    </div>
  );
}

export default HomePage;
