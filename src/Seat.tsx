function Seat({ guest }: { guest: Person }) {
  return <li>{guest.name}</li>;
}

export default Seat;
