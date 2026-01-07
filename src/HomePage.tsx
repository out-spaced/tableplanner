import GuestList from "./GuestList";
import TableList from "./TableList";

export default function HomePage() {
  return (
    <div className="flex justify-center pt-16 pb-4">
      <TableList />
      <GuestList />
    </div>
  );
}
