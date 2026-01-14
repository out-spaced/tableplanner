import { useEffect, useState } from "react";
import { insertGuest } from "./utils";
import Guest from "./Guest";

function GuestList({
  guests,
  setGuests,
}: {
  guests: Table[];
  setGuests: Function;
}) {
  const [allGuests, setAllGuests] = useState<Person[]>([]);
  const [guestIndexCount, setGuestIndexCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const addGuest = () => {
    // todo: check if name is unique before adding
    if (inputValue.length < 3) {
      setError("Name must be at least 3 characters long");
      return;
    }
    setError("");
    setGuests((prev: Table[]) => {
      const newGuest: Person = {
        index: guestIndexCount,
        name: inputValue,
        paid: false,
        table: 0,
        seat: 0,
        next: null,
        prev: null,
      };
      insertGuest(newGuest, prev[0]);
      const newGuests = [...prev];
      newGuests[0] = { ...prev[0] };
      newGuests[0].seatsOccupied++;
      return newGuests;
    });
    setInputValue("");
    setGuestIndexCount((prev) => prev + 1);
  };

  useEffect(() => {
    const newAllGuests: Person[] = [];
    guests.forEach((table) => {
      let ptr = table.next;
      while (ptr != null) {
        allGuests.push(ptr);
        ptr = ptr.next;
      }
    });
    setAllGuests(newAllGuests);
  }, [guests]);

  return (
    <div className="border rounded-md pl-5 pr-5 pt-2 pb-5">
      <h3>Guest List</h3>
      <div>
        <input
          className="border rounded-md"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="m-1 p-2 pt-1 pb-1 bg-green-500 rounded-sm shadow-gray-500 hover:shadow-md"
          onClick={() => addGuest()}
        >
          Add
        </button>
      </div>
      {error && (
        <div>
          <span className="bg-red-300 rounded-sm p-1">{error}</span>
        </div>
      )}
      <div>
        <ul>
          {allGuests.map((guest, index) => (
            <Guest
              key={index}
              guestInfo={guest}
              index={index}
              setGuests={setGuests}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GuestList;
