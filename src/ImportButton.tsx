function ImportButton({ setTables }: { setTables: Function }) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file && file.type.match("text.*")) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (!e.target) return;
        const newTables = JSON.parse(e.target.result as string);
        fixPrevLinks(newTables);
        setTables(newTables);
      };

      reader.onerror = (err) => {
        // set error state and show in ui
        // err.target.error.name
      };

      reader.readAsText(file);
    } else {
      // todo: set error state and show in ui
    }
  };

  const fixPrevLinks = (tables: Table[]) => {
    tables.forEach((table) => {
      let prevPtr: Table | Person | null = table;
      let currentPtr: Person | null = table.next;
      while (currentPtr != null) {
        currentPtr.prev = prevPtr;
        prevPtr = currentPtr;
        currentPtr = currentPtr.next;
      }
    });
  };

  return (
    <label className="m-1 p-2 pt-1 pb-1 bg-blue-300 rounded-sm shadow-gray-500 hover:shadow-md">
      Import
      <input
        type="file"
        id="fileInput"
        accept=".txt"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
}

export default ImportButton;
