import { useState } from "react";
import Guest from "./Guest";

type Person = {
  name: string;
  paid: boolean;
};

function GuestList() {
  const [guests, setGuests] = useState<Person[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  function addGuest() {
    if (inputValue.length < 3) {
      setError("Name must be at least 3 characters long");
      return;
    }
    setError("");
    setGuests((prev) => [...prev, { name: inputValue, paid: false }]);
    setInputValue("");
  }

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
          {guests.map((guest, index) => (
            <Guest
              key={index}
              guest={guest}
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
