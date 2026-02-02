import { useState, useEffect } from "react";

function ExportButton({
  tables,
  guestIndexCount,
}: {
  tables: Table[];
  guestIndexCount: number;
}) {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    setData(
      JSON.stringify(
        [...tables, { guestIndexCount: guestIndexCount }],
        (key, value) => {
          if (key === "prev") return undefined;
          return value;
        },
      ),
    );
  }, [tables]);

  const handleDownload = () => {
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tableplanner.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="m-1 p-2 pt-1 pb-1 bg-blue-300 rounded-sm shadow-gray-500 hover:shadow-md"
    >
      Export
    </button>
  );
}

export default ExportButton;
