function ImportButton({ setTables }: { setTables: Function }) {
  // save format:
  // ['table', index, seats, seatsOccupied]
  // ['guest', index, name, paid, table]
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // do something
  };
  return (
    <label className="m-1 p-2 pt-1 pb-1 bg-blue-300 rounded-sm shadow-gray-500 hover:shadow-md">
      Import
      <input
        type="file"
        id="fileInput"
        accept=".csv"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
}

export default ImportButton;
