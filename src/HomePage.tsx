import { useState } from "react";
import GuestList from "./GuestList";
import TableList from "./TableList";
import UnassignedList from "./UnassignedList";

function HomePage() {
  const [guests, setGuests] = useState<Person[]>([]);
  const [removed, setRemoved] = useState<Person | null>(null);

  return (
    <div className="flex justify-center pt-16 pb-4">
      <TableList
        guests={guests}
        setGuests={setGuests}
        removed={removed}
        setRemoved={setRemoved}
      />
      <UnassignedList guests={guests} />
      <GuestList
        guests={guests}
        setGuests={setGuests}
        removed={removed}
        setRemoved={setRemoved}
      />
    </div>
  );
}

export default HomePage;
