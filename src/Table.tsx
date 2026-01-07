import Seat from "./Seat";

export default function Table({ table }: { table: Table }) {
  return (
    <div className="border rounded-md p-5 pt-2 mr-5">
      <h3>Table</h3>
      <ul>
        {table.people.map((person, index) => (
          <Seat key={index} person={person} />
        ))}
      </ul>
    </div>
  );
}
