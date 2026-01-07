import Seat from "./Seat";

function Table({
  table,
  setTables,
  setGuests,
}: {
  table: Table;
  setTables: Function;
  setGuests: Function;
}) {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const tableIsFull = () => {
    return table.people.length === table.seats;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const guest = JSON.parse(data);
    if (!tableIsFull()) {
      // set table here
      const newPeople = [...table.people, guest];
      const newTable = { ...table, people: newPeople };
      setTables((prev: Table[]) => {
        // must be inserted into the same location
        const newTables = [...prev];
        newTables[table.index - 1] = newTable;
        return newTables;
      });
      setGuests((prev: Person[]) => {
        const newGuests = [...prev];
        newGuests[guest.index - 1] = {
          ...guest,
          table: table.index,
          seat: table.people.length,
        };
        return newGuests;
      });
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border rounded-md p-5 pt-2 mr-5"
    >
      <h3>Table {table.index}</h3>
      <ul>
        {table.people.map((guest, index) => (
          <Seat key={index} guest={guest} />
        ))}
        {Array.from({ length: table.seats - table.people.length }).map(
          (_, index) => (
            <Seat
              key={index}
              guest={{
                name: "empty",
                paid: false,
                table: 0,
                seat: 0,
                index: 0,
              }}
            />
          )
        )}
      </ul>
    </div>
  );
}

export default Table;
