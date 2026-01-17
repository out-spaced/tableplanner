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
          onClick={() => removeSelf()}
          className="text-gray-500 rounded-sm transition-colors hover:text-red-500 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default Guest;
