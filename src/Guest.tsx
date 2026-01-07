import { useState } from "react";

function Guest({
  guest,
  index,
  setGuests,
  removed,
  setRemoved,
}: {
  guest: Person;
  index: number;
  setGuests: Function;
  removed: Person | null;
  setRemoved: Function;
}) {
  const [paid, setPaid] = useState<boolean>(guest.paid);

  const setPaidOnObject: () => void = () => {
    guest.paid = !paid;
    setPaid((prev) => !prev);
    setGuests((prev: Person[]) => {
      const newGuests = [...prev];
      newGuests[guest.index - 1] = { ...guest, paid: !paid };
      return newGuests;
    });
  };

  const removeSelf: () => void = () => {
    setGuests((prev: Person[]) => prev.filter((_, i) => i !== index));
    setRemoved(guest);
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
          disabled={!!removed}
          onClick={() => removeSelf()}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default Guest;
