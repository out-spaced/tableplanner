import { Activity, useState } from "react";
import ImportButton from "./ImportButton";
import ExportButton from "./ExportButton";
import ResetButton from "./ResetButton";

function Actions({
  tables,
  guestIndexCount,
  setTables,
  setGuestIndexCount,
}: {
  tables: Table[];
  guestIndexCount: number;
  setTables: Function;
  setGuestIndexCount: Function;
}) {
  const [resetClicked, setResetClicked] = useState<boolean>(false);

  const reset = () => {
    setTables([{ index: 0, seats: 5000, seatsOccupied: 0, next: null }]);
    setResetClicked(false);
  };

  return (
    <div className="border rounded-md">
      <h2> Actions </h2>
      <Activity mode={resetClicked ? "hidden" : "visible"}>
        <ImportButton
          setTables={setTables}
          setGuestIndexCount={setGuestIndexCount}
        />
        <ExportButton tables={tables} guestIndexCount={guestIndexCount} />
        <ResetButton setResetClicked={setResetClicked} />
      </Activity>
      <Activity mode={resetClicked ? "visible" : "hidden"}>
        <div>
          <button className="btn-oj" onClick={() => reset()}>
            Reset
          </button>
          <button
            className="btn-default"
            onClick={() => setResetClicked(false)}
          >
            Cancel
          </button>
        </div>
      </Activity>
    </div>
  );
}

export default Actions;
