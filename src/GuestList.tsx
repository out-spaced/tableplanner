import { useEffect, useState } from "react";
import { insertNewGuest } from "./utils";
import Guest from "./Guest";

function GuestList({
  tables,
  setTables,
}: {
  tables: Table[];
  setTables: Function;
}) {
  const [allGuests, setAllGuests] = useState<Person[]>([]);
  const [guestIndexCount, setGuestIndexCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const addGuest = () => {
    if (inputValue.length < 3) {
      setError("Name must be at least 3 characters long");
      return;
    }
    setError("");
    setInputValue("");
    setGuestIndexCount((prev) => prev + 1);
    const newTables = [...tables];
    newTables[0] = { ...tables[0] };
    insertNewGuest(guestIndexCount, inputValue, newTables[0]);
    setTables(newTables);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addGuest();
    } else {
      setError("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.replace(/[^().a-zA-Z0-9\s]/g, ""));
  };

  useEffect(() => {
    const newAllGuests: Person[] = [];
    tables.forEach((table) => {
      let ptr = table.next;
      while (ptr != null) {
        newAllGuests.push(ptr);
        ptr = ptr.next;
      }
    });
    newAllGuests.sort((a, b) => a.name.localeCompare(b.name));
    setAllGuests(newAllGuests);
  }, [tables]);

  return (
    <div className="border rounded-md">
      <h3>Guest List</h3>
      <div className="flex flex-col md:flex-row md:items-center">
        <input
          id="guest-name-input"
          className="border rounded-md"
          type="text"
          value={inputValue}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
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
          {allGuests.map((guest) => (
            <Guest
              key={guest.index}
              guestInfo={guest}
              tables={tables}
              setTables={setTables}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GuestList;
