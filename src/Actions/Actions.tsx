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
    setGuestIndexCount(0);
    setResetClicked(false);
  };

  return (
    <div className="big-component">
      <div className="flex flex-col grow">
        <h2 className="component-title"> Actions </h2>
        <Activity mode={resetClicked ? "hidden" : "visible"}>
          <div>
            <ImportButton
              setTables={setTables}
              setGuestIndexCount={setGuestIndexCount}
            />
            <ExportButton tables={tables} guestIndexCount={guestIndexCount} />
            <ResetButton setResetClicked={setResetClicked} />
          </div>
        </Activity>
        <Activity mode={resetClicked ? "visible" : "hidden"}>
          <div>
            <button className="btn-default btn-reset" onClick={() => reset()}>
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
    </div>
  );
}

export default Actions;
