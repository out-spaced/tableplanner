interface Person {
  name: string;
  paid: boolean;
  table: number;
  seat: number;
};

interface Table {
  index: number;
  seats: number;
  people: Person[]
};

