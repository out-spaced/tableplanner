import { useEffect, useState } from "react";
import GuestList from "./GuestList";
import TableList from "./TableList";
import UnassignedList from "./UnassignedList";
import ExportButton from "./ExportButton";
import ImportButton from "./ImportButton";
import ResetButton from "./ResetButton";

function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [guestIndexCount, setGuestIndexCount] = useState<number>(0);
  const [tables, setTables] = useState<Table[]>([
    { index: 0, seats: 5000, seatsOccupied: 0, next: null }, //create unassigned table
  ]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse) and (hover: none)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Table Planner</h1>
        </div>
      </header>
      <div className="flex md:justify-center items-start md:pt-16 overflow-x-auto">
        {!isMobile && (
          <UnassignedList
            tables={tables}
            setTables={setTables}
            unassignedHead={tables[0]}
          />
        )}
        <TableList tables={tables} setTables={setTables} />
        <div>
          <div className="border rounded-md">
            <h2> Actions </h2>
            <ImportButton
              setTables={setTables}
              setGuestIndexCount={setGuestIndexCount}
            />
            <ExportButton tables={tables} guestIndexCount={guestIndexCount} />
            <ResetButton setTables={setTables} />
          </div>
          <GuestList
            tables={tables}
            setTables={setTables}
            guestIndexCount={guestIndexCount}
            setGuestIndexCount={setGuestIndexCount}
          />
          {isMobile && (
            <UnassignedList
              tables={tables}
              setTables={setTables}
              unassignedHead={tables[0]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
