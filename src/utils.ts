const createTable = (index: number, seats: number): Table => {
  return {
    index,
    seats,
    seatsOccupied: 0,
    next: null,
  }
}

const getLastInTable = (tableHead: Table): Person | Table=> {
  let last: Person | Table = tableHead;
  while (last.next != null) {
    last = last.next;
  }
  return last;
}

const insertGuest = (guest: Person, tableHead: Table): Table => {
  // size check not done here, should be done before calling
  const last = getLastInTable(tableHead);
  last.next = guest;
  tableHead.seatsOccupied++;
  guest.table = tableHead.index;
  guest.seat = tableHead.seatsOccupied;
  return {...tableHead}; // is this necessary?
}

const removePersonFromTable = (tableHead: Table) : Table => {
  return {...tableHead};
} 

export { createTable, insertGuest, removePersonFromTable, getLastInTable};