import { findGuest, removeGuestByIndex } from "./utils";

function Guest({
  guestInfo,
  setGuests,
}: {
  guestInfo: Person;
  setGuests: Function;
}) {
  //const [paid, setPaid] = useState<boolean>(guestInfo.paid);

  const setPaidOnObject: () => void = () => {
    //setPaid((prev) => !prev); redundant
    setGuests((prev: Table[]) => {
      const guestObj = findGuest(guestInfo.index, prev[guestInfo.table]);
      if (guestObj != null) {
        guestObj.paid = !guestObj.paid;
      }
      const newTable = { ...prev[guestInfo.table] };
      const newGuests = [...prev];
      newGuests[guestInfo.table] = newTable;
      return newGuests;
    });
  };

  const removeSelf: () => void = () => {
    //setGuests((prev: Person[]) => prev.filter((_, i) => i !== index));
    setGuests((prev: Table[]) => {
      removeGuestByIndex(guestInfo.index, prev[guestInfo.table]);
      const newTable = { ...prev[guestInfo.table] };
      const newGuests = [...prev];
      newGuests[guestInfo.table] = newTable;
      return newGuests;
    });
  };

  return (
    <li>
      <div>
        {guestInfo.name} {guestInfo.index}
      </div>
      <div>
        <button
          className={`${
            guestInfo.paid ? "bg-green-400" : "bg-red-400"
          } m-1 p-2 pt-1 pb-1 shadow-gray-500 hover:shadow-md`}
          onClick={() => setPaidOnObject()}
        >
          {guestInfo.paid ? "Paid" : "Not Paid"}
        </button>
        <button
          className="m-1 p-2 pt-1 pb-1 bg-amber-500 rounded-sm shadow-gray-500 hover:shadow-md"
          // disabled={!!removed} todo: function of this must be replaced somehow
          onClick={() => removeSelf()}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default Guest;
