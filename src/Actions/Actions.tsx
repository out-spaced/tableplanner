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
  return (
    <div className="border rounded-md">
      <h2> Actions </h2>
      <ImportButton
        setTables={setTables}
        setGuestIndexCount={setGuestIndexCount}
      />
      <ExportButton tables={tables} guestIndexCount={guestIndexCount} />
      <ResetButton setTables={setTables} />
    </div>
  );
}

export default Actions;
