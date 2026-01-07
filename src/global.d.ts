interface Person {
  index: number; // 1 indexed
  name: string;
  paid: boolean;
  table: number;
  seat: number;
};

interface Table {
  index: number; // 1 indexed
  seats: number;
  people: Person[]
};

