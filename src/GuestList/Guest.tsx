import { findGuest, removeGuestByIndex } from "../utils";

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
    <li className="border border-transparent select-none rounded-sm hover:border hover:border-gray-300">
      <div className="flex justify-between">
        <div className="flex">
          <button
            className={`${
              guestInfo.paid
                ? "bg-green-300 hover:bg-green-500 hover:text-black"
                : "bg-red-300 hover:bg-red-500 hover:text-white"
            } text-sm mr-2 p-1 rounded-sm`}
            onClick={() => setPaidOnObject()}
          >
            $
          </button>
          <div className="name-text">
            {guestInfo.name} {guestInfo.table > 0 && `(${guestInfo.table})`}
          </div>
        </div>
        <div className="flex">
          <button
            onClick={() => removeSelf()}
            className="text-xs text-gray-500 rounded-sm transition-colors hover:text-red-500 hover:bg-red-100"
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
      </div>
    </li>
  );
}

export default Guest;
