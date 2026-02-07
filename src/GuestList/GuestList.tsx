import { useEffect, useState, Activity } from "react";
import { insertNewGuest } from "../utils";
import Guest from "./Guest";
import HideGuestList from "./HideGuestList";

function GuestList({
  tables,
  setTables,
  guestIndexCount,
  setGuestIndexCount,
  isMobile,
}: {
  tables: Table[];
  setTables: Function;
  guestIndexCount: number;
  setGuestIndexCount: Function;
  isMobile: boolean;
}) {
  const [allGuests, setAllGuests] = useState<Person[]>([]);
  const [guestDupeCheck, setGuestDupeCheck] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const addGuest = () => {
    const trimmedInputValue = inputValue.replace(/\s+/g, " ").trim();
    if (trimmedInputValue.length < 3) {
      setError("Name must be at least 3 characters");
      return;
    }
    if (guestDupeCheck.has(trimmedInputValue.toLowerCase())) {
      setError("Name already exists");
      return;
    }
    setError("");
    setInputValue("");
    setGuestIndexCount((prev: number) => prev + 1);
    const newTables = [...tables];
    newTables[0] = { ...tables[0] };
    insertNewGuest(guestIndexCount, trimmedInputValue, newTables[0]);
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
    const newGuestDupeCheck: Set<string> = new Set();
    tables.forEach((table) => {
      let ptr = table.next;
      while (ptr != null) {
        newAllGuests.push(ptr);
        newGuestDupeCheck.add(ptr.name.toLowerCase());
        ptr = ptr.next;
      }
    });
    newAllGuests.sort((a, b) => a.name.localeCompare(b.name));
    setAllGuests(newAllGuests);
    setGuestDupeCheck(newGuestDupeCheck);
  }, [tables]);

  return (
    <div className="big-component flex-col">
      <h2 className="component-title">Guest List</h2>
      {isMobile && (
        <HideGuestList isVisible={isVisible} setIsVisible={setIsVisible} />
      )}
      <Activity mode={isVisible ? "visible" : "hidden"}>
        <div className="flex flex-col md:flex-row md:items-center pt-2 pb-2">
          <input
            id="guest-name-input"
            className="text-input"
            type="text"
            value={inputValue}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            placeholder="Enter guest name..."
          />
          <button className="btn-default" onClick={() => addGuest()}>
            Add
          </button>
        </div>
        {error && (
          <div>
            <span className="bg-red-300 rounded-sm p-1 text-xs">{error}</span>
          </div>
        )}
        <Activity mode={allGuests.length === 0 ? "hidden" : "visible"}>
          <div className="list-container">
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
        </Activity>
      </Activity>
    </div>
  );
}

export default GuestList;
