import { findGuest, removeGuestByIndex } from "./utils";

function Guest({
  guestInfo,
  tables,
  setTables,
}: {
  guestInfo: Person;
  tables: Table[];
  setTables: Function;
}) {
  const setPaidOnObject: () => void = () => {
    const guestObj = findGuest(guestInfo.index, tables[guestInfo.table]);
    if (guestObj == null) {
      return;
    }
    guestObj.paid = !guestObj.paid;
    const newTable = { ...tables[guestInfo.table] };
    const newTables = [...tables];
    newTables[guestInfo.table] = newTable;
    setTables(newTables);
  };

  const removeSelf: () => void = () => {
    removeGuestByIndex(guestInfo.index, tables[guestInfo.table]);
    const newTable = { ...tables[guestInfo.table] };
    const newTables = [...tables];
    newTables[guestInfo.table] = newTable;
    setTables(newTables);
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
