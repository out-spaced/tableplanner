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

const insertGuest = (guest: Person, tableHead: Table): void => {
  // size check not done here, should be done before calling
  const last = getLastInTable(tableHead);
  last.next = guest;
  tableHead.seatsOccupied++;
  guest.table = tableHead.index;
  guest.seat = tableHead.seatsOccupied;
}

const removePersonFromTable = () : void => {

} 

export { createTable, insertGuest, removePersonFromTable, getLastInTable};