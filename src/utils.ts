const createTable = (index: number, seats: number): Table => {
  return {
    index,
    seats,
    seatsOccupied: 0,
    next: null,
  }
}

const getLastInTable = (table: Table): Person | Table=> {
  let last: Person | Table = table;
  while (last.next != null) {
    last = last.next;
  }
  return last;
}

const insertGuest = (guest: Person, table: Table): Table => {
  // size check not done here, should be done before calling
  const last = getLastInTable(table);
  last.next = guest;
  table.seatsOccupied++;
  guest.table = table.index;
  guest.seat = table.seatsOccupied;
  return {...table}; // is this necessary?
}

const removeGuestByIndex = (guestIndex: number, table: Table) : Table => {
    //todo: implement
  return {...table};
} 

const findGuest = (guestIndex: number, table: Table): Person | null => {
    let ptr = table.next;
    while (ptr != null) {
        if (ptr.index === guestIndex) {
            break;
        }
        ptr = ptr.next;
    }
    return ptr;
}

export { createTable, insertGuest, removeGuestByIndex, getLastInTable, findGuest};