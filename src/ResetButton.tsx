function ResetButton({ setTables }: { setTables: Function }) {
  const reset = () => {
    setTables([{ index: 0, seats: 5000, seatsOccupied: 0, next: null }]);
  };

  return (
    <button
      onClick={() => reset()}
      className="m-1 p-2 pt-1 pb-1 bg-amber-500 rounded-sm shadow-gray-500 hover:shadow-md"
    >
      Reset
    </button>
  );
}

export default ResetButton;
