import { useState } from "react";
import GuestList from "./GuestList";
import TableList from "./TableList";
import UnassignedList from "./UnassignedList";

function HomePage() {
  const [guests, setGuests] = useState<Table[]>([
    { index: 0, seats: 5000, seatsOccupied: 0, next: null }, //create unassigned table
  ]);

  return (
    <div className="flex justify-center pt-16 pb-4">
      <TableList guests={guests} setGuests={setGuests} />
      <UnassignedList
        guests={guests}
        setGuests={setGuests}
        unassignedHead={guests[0]}
      />
      <GuestList guests={guests} setGuests={setGuests} />
    </div>
  );
}

export default HomePage;
