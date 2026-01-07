function Seat({ guest }: { guest: Person }) {
  return <li className="border rounded-md">{guest.name}</li>;
}

export default Seat;
