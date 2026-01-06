import { useState } from "react";

function Guest({
  guest,
  index,
  setGuests,
}: {
  guest: Person;
  index: number;
  setGuests: Function;
}) {
  const [paid, setPaid] = useState(guest.paid);

  const setPaidOnObject: () => void = () => {
    guest.paid = !paid;
    setPaid((prev) => !prev);
  };

  const removeSelf: () => void = () => {
    setGuests((prev: Person[]) => prev.filter((_, i) => i !== index));
  };

  return (
    <li>
      <div>
        {guest.name} {index}
      </div>
      <div>
        <button
          className={`${
            paid ? "bg-green-400" : "bg-red-400"
          } m-1 p-2 pt-1 pb-1 shadow-gray-500 hover:shadow-md`}
          onClick={() => setPaidOnObject()}
        >
          {paid ? "Paid" : "Not Paid"}
        </button>
        <button
          className="m-1 p-2 pt-1 pb-1 bg-amber-500 rounded-sm shadow-gray-500 hover:shadow-md"
          onClick={() => removeSelf()}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default Guest;
