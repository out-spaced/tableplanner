import GuestList from "./GuestList";
import Table from "./Table";

export default function HomePage() {
  return (
    <div className="flex justify-center pt-16 pb-4">
      <Table />
      <GuestList />
    </div>
  );
}
