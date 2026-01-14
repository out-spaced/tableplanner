interface Person {
  index: number; 
  name: string;
  paid: boolean;
  table: number; // 0 is unassigned table
  seat: number;  // 1-indexed
  next: Person | null;
  prev: Person | null;
};

interface Table {
  index: number; // 0 is unassigned table
  seats: number;
  seatsOccupied: number;
  next: Person | null;
};

