import { findGuest, removeGuestByIndex } from "./utils";

function Guest({
  guestInfo,
  guests,
  setGuests,
}: {
  guestInfo: Person;
  guests: Table[];
  setGuests: Function;
}) {
  //const [paid, setPaid] = useState<boolean>(guestInfo.paid);

  const setPaidOnObject: () => void = () => {
    //setPaid((prev) => !prev); redundant
    const guestObj = findGuest(guestInfo.index, guests[guestInfo.table]);
    if (guestObj == null) {
      return;
    }
    guestObj.paid = !guestObj.paid;
    const newTable = { ...guests[guestInfo.table] };
    const newGuests = [...guests];
    newGuests[guestInfo.table] = newTable;
    setGuests(newGuests);
  };

  const removeSelf: () => void = () => {
    removeGuestByIndex(guestInfo.index, guests[guestInfo.table]);
    const newTable = { ...guests[guestInfo.table] };
    const newGuests = [...guests];
    newGuests[guestInfo.table] = newTable;
    setGuests(newGuests);
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
          onClick={() => removeSelf()}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default Guest;
