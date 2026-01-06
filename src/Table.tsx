import Seat from "./Seat";

export default function Table() {
  return (
    <div className="border rounded-md p-5 pt-2 mr-5">
      <h3>Table</h3>
      <ul>
        <Seat />
        <Seat />
        <Seat />
      </ul>
    </div>
  );
}
